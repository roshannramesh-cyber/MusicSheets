"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ---------------------------------------------------------------------------
// Helper — register a new user via the backend
// ---------------------------------------------------------------------------
async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? "Registration failed");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "register") {
        await registerUser(name, email, password);
      }
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: "login" | "register") => {
    setMode(next);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(139,92,246,0.14) 0%, transparent 55%),
            var(--bg-base);
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* ── Header ── */
        .login-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }
        .login-icon {
          width: 56px;
          height: 56px;
          border-radius: 1rem;
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }
        .login-title {
          margin: 0;
          font-size: 1.625rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .login-subtitle {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        /* ── Tab toggle ── */
        .tab-bar {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          border-radius: 0.75rem;
          padding: 4px;
          gap: 4px;
        }
        .tab-btn {
          flex: 1;
          padding: 0.5rem 0;
          border: none;
          border-radius: 0.55rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s var(--ease-default),
                      color 0.2s var(--ease-default),
                      box-shadow 0.2s var(--ease-default);
          background: transparent;
          color: var(--text-muted);
        }
        .tab-btn[aria-pressed="true"] {
          background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
          color: #fff;
          box-shadow: 0 2px 12px rgba(99,102,241,0.35);
        }

        /* ── Form ── */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }

        /* ── Error ── */
        .error-box {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.75rem 0.875rem;
          border-radius: 0.625rem;
          background: var(--error-bg);
          border: 1px solid rgba(248,113,113,0.25);
          color: var(--error);
          font-size: 0.875rem;
          line-height: 1.45;
          animation: slide-down 0.2s var(--ease-default);
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Spinner ── */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Name field slide-in ── */
        .field-animate {
          overflow: hidden;
          animation: field-in 0.22s var(--ease-default);
        }
        @keyframes field-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Footer note ── */
        .login-footer {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-subtle);
          line-height: 1.5;
        }
      `}</style>

      <main className="login-root">
        <div className="glass-card login-card">

          {/* Header */}
          <div className="login-header">
            <div className="login-icon" aria-hidden="true">🎵</div>
            <h1 className="login-title gradient-text">MusicSheets</h1>
            <p className="login-subtitle">AI-powered piano transcription</p>
          </div>

          {/* Tab toggle */}
          <div className="tab-bar" role="tablist" aria-label="Authentication mode">
            <button
              id="tab-login"
              className="tab-btn"
              type="button"
              role="tab"
              aria-pressed={mode === "login"}
              onClick={() => switchMode("login")}
            >
              Log in
            </button>
            <button
              id="tab-register"
              className="tab-btn"
              type="button"
              role="tab"
              aria-pressed={mode === "register"}
              onClick={() => switchMode("register")}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form
            className="auth-form"
            onSubmit={handleSubmit}
            aria-label={mode === "login" ? "Login form" : "Register form"}
          >
            {mode === "register" && (
              <div className="field field-animate">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  className="form-input"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            {error && (
              <div className="error-box" role="alert" aria-live="assertive">
                <span aria-hidden="true">⚠️</span>
                {error}
              </div>
            )}

            <button
              id="submit-btn"
              className="btn-primary"
              type="submit"
              disabled={submitting}
              style={{ marginTop: "0.25rem" }}
            >
              {submitting ? (
                <><span className="spinner" aria-hidden="true" /> Please wait…</>
              ) : mode === "login" ? (
                "Log in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="login-footer">
            By continuing, you agree to our&nbsp;Terms&nbsp;&&nbsp;Privacy&nbsp;Policy.
          </p>
        </div>
      </main>
    </>
  );
}
