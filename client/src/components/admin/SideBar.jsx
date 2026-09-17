import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const mainNav = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/admin/projects",
  },
  {
    label: "Writing",
    icon: FileText,
    path: "/admin/writing",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/admin/messages",
  },
];

const secondaryNav = [
  {
    label: "Settings",
    icon: Settings,
    path: "/nosa-panel-x7k/settings",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-[#252a2f] bg-[#0b0d0f] px-4 py-5 text-[#f1f1ee]">

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

      {/* VIEW SITE — keep as <a> since it leaves the admin app */}
      <a
        href="/"
        className="mb-3 flex h-[40px] items-center gap-3 rounded-[4px] px-3 text-[12px] font-medium text-[#858b91] transition-all duration-200 hover:bg-[#171b1f] hover:text-[#f1f1ee]"
      >
        <ExternalLink size={16} strokeWidth={1.8} />
        View website
      </a>

      {/* USER */}
      <div className="border-t border-[#252a2f] pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315bea] text-[11px] font-semibold text-white">
            N
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#f1f1ee]">
              Igbinosa Nosa
            </p>

            <p className="truncate text-[10px] text-[#555c63]">
              Administrator
            </p>
          </div>

          <button
            type="button"
            className="text-[#555c63] transition-colors hover:text-[#f1f1ee]"
            title="Log out"
          >
            <LogOut size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  );
}