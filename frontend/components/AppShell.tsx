"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/my-sheets": "My Sheet Music",
  "/upload": "Upload Audio",
  "/settings": "Settings",
};

function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const pageTitle = PAGE_TITLES[pathname] ?? "MusicSheets";

  if (loading || (!loading && !user)) return null;

  return (
    <>
      <div className="app-shell">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="app-main">
          <TopBar
            pageTitle={pageTitle}
            onMenuToggle={() => setSidebarOpen((p) => !p)}
            isSidebarOpen={sidebarOpen}
          />
          <main className="app-content" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
      <style>{`
        .app-shell {
          display: flex;
          min-height: 100vh;
          background:
            radial-gradient(ellipse 70% 60% at 95% 5%, rgba(99,102,241,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 5% 90%, rgba(139,92,246,0.07) 0%, transparent 50%),
            var(--bg-base);
        }
        .app-main {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          margin-left: var(--sidebar-width);
          transition: margin-left 0.28s var(--ease-default);
        }
        @media (max-width: 767px) {
          .app-main { margin-left: 0; }
        }
        .app-content {
          flex: 1;
          padding: 2.5rem 2rem 3.5rem;
          max-width: 1100px;
          width: 100%;
        }
        @media (max-width: 640px) {
          .app-content { padding: 1.5rem 1rem 2.5rem; }
        }
      `}</style>
    </>
  );
}

export default AppShell;
