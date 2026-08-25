"use client";

import AppShell from "@/components/AppShell";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Mock sheet data
// ---------------------------------------------------------------------------
const SHEETS = [
  { id: "s1", title: "Moonlight Sonata — Mvt. 1", composer: "Beethoven", pages: 3, lastEdited: "Aug 23, 2026", status: "ready" as const },
  { id: "s2", title: "Clair de Lune",              composer: "Debussy",   pages: 5, lastEdited: "Aug 22, 2026", status: "exported" as const },
  { id: "s3", title: "Nocturne in E-flat, Op.9",   composer: "Chopin",    pages: 4, lastEdited: "Aug 21, 2026", status: "ready" as const },
  { id: "s4", title: "Für Elise",                  composer: "Beethoven", pages: 2, lastEdited: "Aug 20, 2026", status: "exported" as const },
  { id: "s5", title: "Gymnopédie No. 1",            composer: "Satie",     pages: 3, lastEdited: "Aug 19, 2026", status: "ready" as const },
];

const STATUS_STYLES: Record<string, string> = {
  ready:    "badge-ready",
  exported: "badge-exported",
  processing: "badge-processing",
};
const STATUS_LABELS: Record<string, string> = {
  ready: "Ready", exported: "Exported", processing: "Processing",
};

export default function MySheetsPage() {
  return (
    <AppShell>
      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">My Sheet Music</h1>
            <p className="page-sub">All your transcribed and saved sheet music in one place.</p>
          </div>
          <Link href="/upload" className="btn-primary ms-upload-btn" aria-label="Upload a new recording">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload New
          </Link>
        </div>

        {/* Sheets grid */}
        <div className="ms-grid">
          {SHEETS.map((sheet) => (
            <article key={sheet.id} className="ms-card glass-card">
              <div className="ms-card-icon" aria-hidden="true">🎼</div>
              <div className="ms-card-body">
                <p className="ms-card-title">{sheet.title}</p>
                <p className="ms-card-meta">{sheet.composer} · {sheet.pages} pages</p>
                <p className="ms-card-date">Edited {sheet.lastEdited}</p>
              </div>
              <span className={`ms-badge ${STATUS_STYLES[sheet.status]}`}>
                {STATUS_LABELS[sheet.status]}
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .page-content { display: flex; flex-direction: column; gap: 1.75rem; }
        .page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .page-title {
          margin: 0;
          font-size: clamp(1.4rem, 2.5vw, 1.875rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }
        .page-sub {
          margin: 0.25rem 0 0;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .ms-upload-btn {
          width: auto;
          padding: 0.55rem 1.1rem;
          font-size: 0.875rem;
          border-radius: 0.75rem;
          text-decoration: none;
        }

        .ms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .ms-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s var(--ease-default), box-shadow 0.2s var(--ease-default);
        }
        .ms-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
        }
        .ms-card-icon {
          font-size: 1.75rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .ms-card-body { flex: 1; min-width: 0; }
        .ms-card-title {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ms-card-meta {
          margin: 0.125rem 0 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .ms-card-date {
          margin: 0.125rem 0 0;
          font-size: 0.75rem;
          color: var(--text-subtle);
        }
        .ms-badge {
          flex-shrink: 0;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid transparent;
        }
        .badge-ready {
          background: var(--status-ready-bg);
          border-color: var(--status-ready-border);
          color: var(--status-ready-text);
        }
        .badge-exported {
          background: var(--status-exported-bg);
          border-color: var(--status-exported-border);
          color: var(--status-exported-text);
        }
        .badge-processing {
          background: var(--status-processing-bg);
          border-color: var(--status-processing-border);
          color: var(--status-processing-text);
        }
      `}</style>
    </AppShell>
  );
}
