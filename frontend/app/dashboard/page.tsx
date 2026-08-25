"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
function Skeleton({ width, height }: { width?: string; height?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
        borderRadius: "0.5rem",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s ease-in-out infinite",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Empty sheet card
// ---------------------------------------------------------------------------
function SheetCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="sheet-card glass-card">
      <div className="sheet-card-icon" aria-hidden="true">
        {icon}
      </div>
      <p className="sheet-card-title">{title}</p>
      <p className="sheet-card-sub">{subtitle}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <style>{`
        /* ── Shimmer keyframes ── */
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Layout ── */
        .dash-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(ellipse 70% 50% at 90% 5%, rgba(99,102,241,0.12) 0%, transparent 55%),
            var(--bg-base);
        }

        /* ── Navbar ── */
        .dash-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 64px;
          background: rgba(11,15,26,0.75);
          border-bottom: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .nav-logo-name {
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: -0.01em;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .nav-user {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .nav-user span {
          color: var(--text-primary);
          font-weight: 500;
        }
        .btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.45rem 1rem;
          border-radius: 0.625rem;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.04);
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s var(--ease-default),
                      color 0.2s var(--ease-default),
                      background 0.2s var(--ease-default);
        }
        .btn-logout:hover {
          border-color: var(--accent-from);
          color: var(--text-primary);
          background: rgba(99,102,241,0.08);
        }

        /* ── Main content ── */
        .dash-main {
          flex: 1;
          max-width: 1024px;
          width: 100%;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* ── Hero ── */
        .dash-hero {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .dash-welcome {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .dash-name {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .dash-email {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        /* ── Section header ── */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .section-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }
        .section-badge {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 99px;
          padding: 0.2rem 0.65rem;
        }

        /* ── Sheet cards grid ── */
        .sheets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        .sheet-card {
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.625rem;
          text-align: center;
          transition: transform 0.2s var(--ease-default),
                      box-shadow 0.2s var(--ease-default);
        }
        .sheet-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
        }
        .sheet-card-icon {
          font-size: 2rem;
          line-height: 1;
        }
        .sheet-card-title {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .sheet-card-sub {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        /* ── Empty state ── */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 3rem 2rem;
          text-align: center;
          border-radius: 1.25rem;
          border: 1px dashed var(--glass-border);
          color: var(--text-muted);
        }
        .empty-icon {
          font-size: 2.5rem;
          opacity: 0.6;
        }
        .empty-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .empty-sub {
          margin: 0;
          font-size: 0.875rem;
        }

        /* ── Quick actions ── */
        .quick-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .action-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: 0.625rem;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.04);
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: default;
          transition: border-color 0.2s, color 0.2s;
        }
        .action-chip.primary {
          border-color: var(--accent-from);
          color: var(--accent-from);
          background: rgba(99,102,241,0.08);
        }

        /* ── Skeleton rows ── */
        .skeleton-card {
          padding: 1.5rem 1.25rem;
          border-radius: 1.25rem;
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
      `}</style>

      <div className="dash-root">

        {/* ── Navbar ── */}
        <nav className="dash-nav" aria-label="Main navigation">
          <a className="nav-logo" href="/dashboard" aria-label="MusicSheets home">
            <div className="nav-logo-icon" aria-hidden="true">🎵</div>
            <span className="nav-logo-name gradient-text">MusicSheets</span>
          </a>

          <div className="nav-right">
            {!loading && user && (
              <span className="nav-user">
                Signed in as <span>{user.name}</span>
              </span>
            )}
            <button
              id="logout-btn"
              type="button"
              className="btn-logout"
              onClick={handleLogout}
            >
              <span aria-hidden="true">↩</span> Log out
            </button>
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="dash-main">

          {/* Hero */}
          <section aria-label="Welcome" className="dash-hero">
            {loading ? (
              <>
                <Skeleton width="120px" height="0.875rem" />
                <Skeleton width="260px" height="2rem" />
                <Skeleton width="180px" height="0.9rem" />
              </>
            ) : (
              <>
                <p className="dash-welcome">Welcome back</p>
                <h1 className="dash-name gradient-text">{user?.name}</h1>
                <p className="dash-email">{user?.email}</p>
              </>
            )}
          </section>

          {/* Quick actions */}
          <section aria-label="Quick actions">
            <div className="section-header">
              <h2 className="section-title">Quick actions</h2>
            </div>
            <div className="quick-actions">
              <span className="action-chip primary">🎹 Transcribe audio</span>
              <span className="action-chip">📤 Upload sheet</span>
              <span className="action-chip">🔍 Browse library</span>
            </div>
          </section>

          {/* Music sheets */}
          <section aria-label="Your music sheets">
            <div className="section-header">
              <h2 className="section-title">Your sheets</h2>
              <span className="section-badge">0 sheets</span>
            </div>

            {loading ? (
              <div className="sheets-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton-card">
                    <Skeleton width="48px" height="48px" />
                    <Skeleton width="70%" height="0.875rem" />
                    <Skeleton height="0.75rem" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" role="status">
                <span className="empty-icon" aria-hidden="true">🎼</span>
                <p className="empty-title">No sheets yet</p>
                <p className="empty-sub">
                  Your transcribed music sheets will appear here.
                  <br />Upload audio to get started.
                </p>
              </div>
            )}
          </section>

          {/* Sample cards — shown when not loading (placeholder demo) */}
          {!loading && (
            <section aria-label="Featured examples">
              <div className="section-header">
                <h2 className="section-title">Example sheets</h2>
                <span className="section-badge">Demo</span>
              </div>
              <div className="sheets-grid">
                <SheetCard icon="🎹" title="Moonlight Sonata" subtitle="Beethoven · 3 pages" />
                <SheetCard icon="🎵" title="Clair de Lune" subtitle="Debussy · 5 pages" />
                <SheetCard icon="🎶" title="Für Elise" subtitle="Beethoven · 2 pages" />
                <SheetCard icon="🎼" title="Nocturne Op.9" subtitle="Chopin · 4 pages" />
              </div>
            </section>
          )}

        </main>
      </div>
    </>
  );
}
