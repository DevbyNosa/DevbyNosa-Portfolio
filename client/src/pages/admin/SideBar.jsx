import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Monitor,
  BarChart3,
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const mainNav = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Homepage", icon: Monitor, path: "/admin/homepage" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Projects", icon: FolderKanban, path: "/admin/projects" },
  { label: "Writing", icon: FileText, path: "/admin/writing" },
  { label: "Messages", icon: MessageSquare, path: "/admin/messages" },
];

const secondaryNav = [
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    axios
      .get("/api/admin/auth/me")
      .then((res) => {
        if (!cancelled) setUser(res.data?.data?.user ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await axios.post("/api/admin/auth/logout");
    } catch (err) {
      console.error("[logout] failed:", err);
    } finally {
      navigate("/admin", { replace: true });
    }
  }

  const initials = (user?.name || user?.email || "A")
    .split(/[\s@]/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="fixed right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center border border-[#252a2f] bg-[#111417] text-[#f1f1ee] md:hidden"
        aria-label={mobileOpen ? "Close admin menu" : "Open admin menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close admin menu"
        />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[240px] max-w-[85vw] flex-col border-r border-[#252a2f] bg-[#0b0d0f] px-4 py-5 text-[#f1f1ee] transition-transform duration-300 md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* BRAND */}
      <div className="px-3 pb-8">
        <Link
          to="/admin/dashboard"
          className="font-['Space_Grotesk'] text-[19px] font-bold tracking-[-0.5px]"
        >
          Devby<span className="text-[#315bea]">Nosa</span>
        </Link>

        <p className="mt-1 text-[9px] font-semibold tracking-[1.5px] text-[#555c63]">
          ADMIN
        </p>
      </div>

      {/* MAIN NAV */}
      <div>
        <p className="mb-3 px-3 text-[9px] font-semibold tracking-[1.5px] text-[#555c63]">
          MAIN
        </p>

        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex h-[40px] items-center gap-3 rounded-[4px] px-3 text-[12px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#315bea] text-white"
                    : "text-[#858b91] hover:bg-[#171b1f] hover:text-[#f1f1ee]"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SECONDARY */}
      <div className="mt-8">
        <p className="mb-3 px-3 text-[9px] font-semibold tracking-[1.5px] text-[#555c63]">
          SYSTEM
        </p>

        <nav>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex h-[40px] items-center gap-3 rounded-[4px] px-3 text-[12px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#315bea] text-white"
                    : "text-[#858b91] hover:bg-[#171b1f] hover:text-[#f1f1ee]"
                }`}
              >
                <Icon size={16} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SPACER */}
      <div className="flex-1" />

      {/* VIEW SITE */}
      <a
        href="/"
        onClick={() => setMobileOpen(false)}
        className="mb-3 flex h-[40px] items-center gap-3 rounded-[4px] px-3 text-[12px] font-medium text-[#858b91] transition-all duration-200 hover:bg-[#171b1f] hover:text-[#f1f1ee]"
      >
        <ExternalLink size={16} strokeWidth={1.8} />
        View website
      </a>

      {/* USER */}
      <div className="border-t border-[#252a2f] pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#315bea] text-[11px] font-semibold text-white">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#f1f1ee]">
              {user?.name || "Admin"}
            </p>
            <p className="truncate text-[10px] text-[#555c63]">
              {user?.email || "Administrator"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-[#555c63] transition-colors hover:text-[#e47d7d] disabled:opacity-50 cursor-pointer"
            title="Log out"
          >
            {loggingOut ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#e47d7d]" />
            ) : (
              <LogOut size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
      </aside>
    </>
  );
}