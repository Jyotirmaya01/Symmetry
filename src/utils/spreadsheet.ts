// ─────────────────────────────────────────────
// SYMMETRY — Spreadsheet Lead Sync Engine
// Records inquiries from Website Form and AJ Bot to:
// 1. Server-side data/inquiries.csv & data/inquiries.json
// 2. Connected Google Sheet Webhook (if configured in .env)
// 3. Local persistent browser lead ledger (exportable anytime)
// ─────────────────────────────────────────────

export interface InquiryRecord {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service?: string;
  slot?: string;
  location?: string;
  message?: string;
  source: 'Website Form' | 'AJ Chat Bot';
  timestamp?: string;
  date?: string;
  time?: string;
}

export async function submitInquiryToSpreadsheet(
  record: InquiryRecord
): Promise<{ success: boolean; message: string }> {
  const now = new Date();
  const fullRecord: InquiryRecord = {
    ...record,
    timestamp: now.toISOString(),
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  };

  // 1. Always store into local browser lead ledger as bulletproof fallback
  try {
    const raw = localStorage.getItem('symmetry_spreadsheet_leads');
    const leads: InquiryRecord[] = raw ? JSON.parse(raw) : [];
    leads.unshift(fullRecord);
    localStorage.setItem('symmetry_spreadsheet_leads', JSON.stringify(leads));
  } catch {
    // Ignore in strict private mode
  }

  // 2. Transmit to server spreadsheet writer & Google Sheet webhook
  try {
    const res = await fetch('/api/submit-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullRecord),
    });

    if (res.ok) {
      return { success: true, message: 'Recorded in spreadsheet' };
    }
  } catch (err) {
    console.warn('Server spreadsheet sync warning (saved to client ledger):', err);
  }

  return { success: true, message: 'Recorded in local ledger' };
}

// Client helper to export current ledger as CSV
export function exportLeadsToCsv() {
  try {
    const raw = localStorage.getItem('symmetry_spreadsheet_leads');
    const leads: InquiryRecord[] = raw ? JSON.parse(raw) : [];
    if (leads.length === 0) {
      alert('No inquiries recorded yet.');
      return;
    }

    const headers = ['Timestamp', 'Date', 'Time', 'Name', 'Phone', 'Email', 'Company', 'Service', 'Slot', 'Source', 'Location', 'Message'];
    const rows = leads.map((l) => [
      `"${l.timestamp || ''}"`,
      `"${l.date || ''}"`,
      `"${l.time || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.slot || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `symmetry_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error('Failed to export leads CSV:', e);
  }
}
