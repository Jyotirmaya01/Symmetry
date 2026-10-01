import { defineConfig, loadEnv, Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini' && req.method === 'POST') {
          try {
            let bodyStr = '';
            for await (const chunk of req) {
              bodyStr += chunk;
            }
            const { prompt, history = [] } = JSON.parse(bodyStr || '{}');

            // Load key on server only — never exposed to client browser bundle
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const key = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;

            if (!key) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Server GEMINI_API_KEY not configured' }));
            }

            // Compact, token-efficient system instruction (~130 tokens)
            const systemInstruction = `You are AJ, an AI assistant working at Symmetry (luxury video commercials, 3D motion graphics, brand identity, websites).
Symmetry Team: Connect clients directly with the Symmetry team. Turnaround: 48-72h project delivery.
Clients: Crack UPSC Exams, Salman BLC Interior Coach, Skyline Graphics, Ranking Partner.
Tone: Direct, human, helpful, professional. Always answer in 2-3 crisp sentences.
If client wants to book or connect, their email is strictly required along with their name so the Symmetry team can confirm details.`;

            // Free tier models in order of speed and quota
            const models = [
              'models/gemini-3.8-flash',
              'models/gemini-3.5-flash-lite',
              'models/gemini-3.5-flash',
            ];

            // Only pass last 2 history turns to minimize token usage
            const trimmedHistory = (history || []).slice(-2).map((h: any) => ({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text: (h.text || '').slice(0, 250) }],
            }));

            trimmedHistory.push({
              role: 'user',
              parts: [{ text: (prompt || '').slice(0, 400) }],
            });

            for (const model of models) {
              try {
                const apiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-goog-api-key': key,
                    },
                    body: JSON.stringify({
                      system_instruction: { parts: [{ text: systemInstruction }] },
                      contents: trimmedHistory,
                      generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 220, // Free tier token saver
                      },
                    }),
                  }
                );

                if (apiRes.ok) {
                  const data = await apiRes.json();
                  const parts = data?.candidates?.[0]?.content?.parts;
                  const replyText = parts
                    ?.filter((p: any) => p.text)
                    .map((p: any) => p.text)
                    .join('\n\n');
                  if (replyText) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ text: replyText, model }));
                  }
                }
              } catch {
                // Try next free tier candidate model
              }
            }

            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Free tier model temporarily busy' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message || 'Gemini proxy error' }));
          }
        }

        // Spreadsheet Lead Sync: Append inquiry to data/inquiries.csv & Google Sheet webhook
        if (req.url === '/api/submit-inquiry' && req.method === 'POST') {
          try {
            let bodyStr = '';
            for await (const chunk of req) {
              bodyStr += chunk;
            }
            const data = JSON.parse(bodyStr || '{}');
            const fs = await import('node:fs/promises');
            const path = await import('node:path');

            const now = new Date();
            const timestamp = now.toISOString();
            const dateStr = data.date || now.toLocaleDateString();
            const timeStr = data.time || now.toLocaleTimeString();

            // Prepare CSV row
            const sanitize = (val: any) => `"${String(val || '').replace(/"/g, '""')}"`;
            const csvRow = [
              sanitize(timestamp),
              sanitize(dateStr),
              sanitize(timeStr),
              sanitize(data.name),
              sanitize(data.phone),
              sanitize(data.email),
              sanitize(data.company),
              sanitize(data.service),
              sanitize(data.slot),
              sanitize(data.source || 'Website Form'),
              sanitize(data.location),
              sanitize(data.message),
            ].join(',') + '\n';

            const dataDir = path.resolve(process.cwd(), 'data');
            const csvPath = path.resolve(dataDir, 'inquiries.csv');
            const jsonPath = path.resolve(dataDir, 'inquiries.json');

            await fs.mkdir(dataDir, { recursive: true });

            // Ensure CSV has header
            try {
              await fs.access(csvPath);
            } catch {
              const header = 'Timestamp,Date,Time,Name,Phone,Email,Company,Service,Slot,Source,Location,Message\n';
              await fs.writeFile(csvPath, header, 'utf-8');
            }

            // Append CSV row
            await fs.appendFile(csvPath, csvRow, 'utf-8');

            // Append JSON array
            let jsonList: any[] = [];
            try {
              const existing = await fs.readFile(jsonPath, 'utf-8');
              jsonList = JSON.parse(existing);
            } catch {
              jsonList = [];
            }
            jsonList.unshift({ ...data, timestamp, date: dateStr, time: timeStr });
            await fs.writeFile(jsonPath, JSON.stringify(jsonList, null, 2), 'utf-8');

            // Forward to connected Google Sheet webhook if configured in .env
            const env = loadEnv(server.config.mode, process.cwd(), '');
            const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || env.GOOGLE_SHEET_WEBHOOK_URL || env.SPREADSHEET_WEBHOOK_URL;
            if (webhookUrl) {
              fetch(webhookUrl, {
                method: 'POST',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ ...data, timestamp, date: dateStr, time: timeStr }),
              }).catch((err) => {
                console.warn('Google Sheet webhook error:', err);
              });
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: true, message: 'Saved to spreadsheet' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // Direct Download of inquiries CSV spreadsheet
        if (req.url === '/api/inquiries.csv' && req.method === 'GET') {
          try {
            const fs = await import('node:fs/promises');
            const path = await import('node:path');
            const csvPath = path.resolve(process.cwd(), 'data', 'inquiries.csv');
            const content = await fs.readFile(csvPath, 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="symmetry_inquiries.csv"');
            return res.end(content);
          } catch {
            res.statusCode = 404;
            return res.end('No inquiries spreadsheet found yet.');
          }
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    geminiApiPlugin(),
  ],
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'vendor-react';
          }
          if (
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'vendor-confetti';
          }
        },
      },
    },
  },
});

