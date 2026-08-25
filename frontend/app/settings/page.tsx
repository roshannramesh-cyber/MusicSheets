"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth-context";

type SettingSection = "profile" | "audio" | "export" | "account";

const SECTIONS: { id: SettingSection; label: string; icon: string }[] = [
  { id: "profile", label: "Profile",        icon: "👤" },
  { id: "audio",   label: "Audio Quality",  icon: "🎚️" },
  { id: "export",  label: "Export Options", icon: "📤" },
  { id: "account", label: "Account",        icon: "🔒" },
];

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      type="button"
      className={`toggle${checked ? " toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-thumb" />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [active, setActive] = useState<SettingSection>("profile");

  // Local state for demo toggles
  const [highRes, setHighRes] = useState(true);
  const [autoMidi, setAutoMidi] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <AppShell>
      <div className="page-content">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Manage your profile, export preferences, and account settings.</p>
        </div>

        <div className="settings-layout">
          {/* Section tabs */}
          <nav className="settings-nav" aria-label="Settings sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                id={`settings-tab-${s.id}`}
                type="button"
                className={`settings-nav-item${active === s.id ? " settings-nav-item--active" : ""}`}
                onClick={() => setActive(s.id)}
                aria-current={active === s.id ? "page" : undefined}
              >
                <span aria-hidden="true">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="settings-panel glass-card">

            {active === "profile" && (
              <div className="settings-section">
                <h2 className="settings-section-title">Profile</h2>
                <div className="settings-avatar-row">
                  <div className="settings-avatar" aria-hidden="true">
                    {user?.name?.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <p className="settings-avatar-name">{user?.name ?? "—"}</p>
                    <p className="settings-avatar-email">{user?.email ?? "—"}</p>
                    <button type="button" className="settings-link-btn">Change avatar</button>
                  </div>
                </div>
                <div className="settings-form">
                  <label className="settings-label" htmlFor="settings-name">Display Name</label>
                  <input id="settings-name" type="text" className="form-input" defaultValue={user?.name ?? ""} placeholder="Your name" />
                  <label className="settings-label" htmlFor="settings-email">Email</label>
                  <input id="settings-email" type="email" className="form-input" defaultValue={user?.email ?? ""} placeholder="you@example.com" />
                </div>
                <button id="settings-save-profile" type="button" className="btn-primary settings-save-btn">Save Changes</button>
              </div>
            )}

            {active === "audio" && (
              <div className="settings-section">
                <h2 className="settings-section-title">Audio Quality</h2>
                <div className="settings-rows">
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">High-resolution transcription</p>
                      <p className="settings-row-sub">Use more processing power for greater accuracy</p>
                    </div>
                    <Toggle id="toggle-highres" checked={highRes} onChange={setHighRes} />
                  </div>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Noise reduction</p>
                      <p className="settings-row-sub">Filter background noise before transcription</p>
                    </div>
                    <Toggle id="toggle-noise" checked={true} onChange={() => {}} />
                  </div>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Pedal detection</p>
                      <p className="settings-row-sub">Detect sustain and soft pedal events</p>
                    </div>
                    <Toggle id="toggle-pedal" checked={false} onChange={() => {}} />
                  </div>
                </div>
              </div>
            )}

            {active === "export" && (
              <div className="settings-section">
                <h2 className="settings-section-title">Export Options</h2>
                <div className="settings-rows">
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Auto-export MIDI</p>
                      <p className="settings-row-sub">Automatically generate MIDI after each transcription</p>
                    </div>
                    <Toggle id="toggle-automidi" checked={autoMidi} onChange={setAutoMidi} />
                  </div>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Include dynamics</p>
                      <p className="settings-row-sub">Preserve velocity and expression in MIDI export</p>
                    </div>
                    <Toggle id="toggle-dynamics" checked={true} onChange={() => {}} />
                  </div>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Default export format</p>
                      <p className="settings-row-sub">Format used when clicking "Export"</p>
                    </div>
                    <select className="settings-select" defaultValue="pdf" aria-label="Default export format">
                      <option value="pdf">PDF</option>
                      <option value="musicxml">MusicXML</option>
                      <option value="midi">MIDI</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {active === "account" && (
              <div className="settings-section">
                <h2 className="settings-section-title">Account</h2>
                <div className="settings-rows">
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Email notifications</p>
                      <p className="settings-row-sub">Receive updates when transcriptions are ready</p>
                    </div>
                    <Toggle id="toggle-email" checked={emailNotif} onChange={setEmailNotif} />
                  </div>
                </div>
                <div className="settings-divider" />
                <div className="settings-danger-zone">
                  <p className="settings-danger-title">Danger Zone</p>
                  <button type="button" className="settings-danger-btn" id="settings-delete-account">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .page-content { display: flex; flex-direction: column; gap: 1.75rem; }
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

        /* ── Settings layout ── */
        .settings-layout {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 600px) {
          .settings-layout { grid-template-columns: 1fr; }
        }

        /* ── Section nav ── */
        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        @media (max-width: 600px) {
          .settings-nav { flex-direction: row; flex-wrap: wrap; }
        }
        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.75rem;
          border-radius: 0.625rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: color 0.18s, background 0.18s;
        }
        .settings-nav-item:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }
        .settings-nav-item--active {
          color: var(--accent-from);
          background: rgba(99,102,241,0.1);
          font-weight: 600;
        }

        /* ── Panel ── */
        .settings-panel { padding: 1.75rem; }
        .settings-section { display: flex; flex-direction: column; gap: 1.25rem; }
        .settings-section-title {
          margin: 0;
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          padding-bottom: 0.875rem;
          border-bottom: 1px solid var(--glass-border);
        }

        /* ── Avatar row ── */
        .settings-avatar-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .settings-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          color: #fff;
          flex-shrink: 0;
        }
        .settings-avatar-name {
          margin: 0;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }
        .settings-avatar-email {
          margin: 0.125rem 0 0;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }
        .settings-link-btn {
          margin-top: 0.375rem;
          background: none;
          border: none;
          color: var(--accent-from);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        /* ── Form ── */
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .settings-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: -0.25rem;
        }
        .settings-save-btn {
          width: auto;
          padding: 0.55rem 1.25rem;
          font-size: 0.875rem;
          border-radius: 0.75rem;
          align-self: flex-start;
        }

        /* ── Rows ── */
        .settings-rows { display: flex; flex-direction: column; gap: 0; }
        .settings-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--glass-border);
        }
        .settings-row:last-child { border-bottom: none; }
        .settings-row-label {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .settings-row-sub {
          margin: 0.125rem 0 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* ── Select ── */
        .settings-select {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          border-radius: 0.5rem;
          padding: 0.4rem 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ── Toggle ── */
        .toggle {
          position: relative;
          width: 44px;
          height: 24px;
          border-radius: 9999px;
          background: var(--glass-border);
          border: none;
          cursor: pointer;
          transition: background 0.2s var(--ease-default);
          flex-shrink: 0;
        }
        .toggle--on { background: var(--accent-from); }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          transition: transform 0.2s var(--ease-default);
        }
        .toggle--on .toggle-thumb { transform: translateX(20px); }

        /* ── Divider & Danger ── */
        .settings-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 0.5rem 0;
        }
        .settings-danger-zone {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .settings-danger-title {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--error);
        }
        .settings-danger-btn {
          padding: 0.45rem 1rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(248,113,113,0.35);
          background: rgba(248,113,113,0.08);
          color: var(--error);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
        }
        .settings-danger-btn:hover {
          background: rgba(248,113,113,0.15);
          border-color: rgba(248,113,113,0.6);
        }
      `}</style>
    </AppShell>
  );
}
