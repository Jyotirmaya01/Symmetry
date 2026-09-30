// ─────────────────────────────────────────────
// Production Serverless Proxy for Gemini Free Tier
// Secure: Key never exposed to client browser
// ─────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  try {
    const { prompt, history = [] } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const systemInstruction = `You are AJ, an AI assistant working at Symmetry (luxury video commercials, 3D motion graphics, brand identity, websites).
Symmetry Team: Connect clients directly with the Symmetry team. Turnaround: 48-72h project delivery.
Clients: Crack UPSC Exams, Salman BLC Interior Coach, Skyline Graphics, Ranking Partner.
Tone: Direct, human, helpful, professional. Always answer in 2-3 crisp sentences.
If client wants to book or connect, their email is strictly required along with their name so the Symmetry team can confirm details.`;

    const models = [
      'models/gemini-3.8-flash',
      'models/gemini-3.5-flash-lite',
      'models/gemini-3.5-flash',
    ];

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
                maxOutputTokens: 220,
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
            return res.status(200).json({ text: replyText, model });
          }
        }
      } catch {
        // Fallback
      }
    }

    return res.status(502).json({ error: 'Gemini free tier model busy' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
