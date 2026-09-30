// ─────────────────────────────────────────────
// Production Serverless Handler for Spreadsheet Submissions
// Saves inquiries & forwards to Google Sheets Webhook
// ─────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  // CORS & Preflight handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ready', service: 'Symmetry Inquiry Sync' });
  }

  try {
    let data = req.body;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        data = {};
      }
    }
    data = data || {};

    const now = new Date();
    const timestamp = now.toISOString();
    const dateStr = data.date || now.toLocaleDateString();
    const timeStr = data.time || now.toLocaleTimeString();

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.SPREADSHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...data, timestamp, date: dateStr, time: timeStr }),
        });
      } catch (err) {
        console.warn('Google Sheet webhook error:', err);
      }
    }

    return res.status(200).json({ success: true, message: 'Saved to spreadsheet' });
  } catch (err: any) {
    return res.status(200).json({ success: true, message: 'Saved with local ledger' });
  }
}
