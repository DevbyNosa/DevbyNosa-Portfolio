import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Globe2,
  Monitor,
  Smartphone,
  Users,
  Eye,
  MapPin,
  Activity,
} from "lucide-react";
import Sidebar from "./SideBar";
import Loading from "./Loading";

// ---- Helpers ----
function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function buildPolyline(data) {
  if (!data || data.length === 0) return "0,178 825,178";
  const max = Math.max(...data.map((d) => d.views), 1);
  return data
    .map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * 825;
      const y = 178 - (d.views / max) * 160;
      return `${x.toFixed(0)},${y.toFixed(0)}`;
    })
    .join(" ");
}

// ---- Stat card ----
function Stat({ label, value, change, icon: Icon, large = false }) {
  return (
    <div
      className={`group relative overflow-hidden border border-[#252a2f] bg-[#111417] p-5 transition-all duration-300 hover:border-[#315bea]/50 ${
        large ? "min-h-[155px]" : "min-h-[135px]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center border border-[#292e33] bg-[#171b1f] text-[#8b9299]">
          <Icon size={15} strokeWidth={1.7} />
        </div>

        {change && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-[#6fce91]">
            <ArrowUpRight size={12} />
            {change}
          </span>
        )}
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-medium uppercase tracking-[1.4px] text-[#666d74]">
          {label}
        </p>

        <p
          className={`mt-1 font-['Space_Grotesk'] font-medium tracking-[-1.5px] text-[#f1f1ee] ${
            large ? "text-[42px]" : "text-[30px]"
          }`}
        >
          {value}
        </p>
      </div>

      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#315bea]/5 blur-2xl transition-all duration-300 group-hover:bg-[#315bea]/10" />
    </div>
  );
}

function ViewsChart({ data = [], total = 0, change = "", days = 30, onDaysChange }) {
  const points = buildPolyline(data);

  const periods = [
    { label: "7D", value: 7 },
    { label: "30D", value: 30 },
    { label: "90D", value: 90 },
  ];

  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6 md:p-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#315bea]" />
            <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
              Portfolio views
            </p>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <h2 className="font-['Space_Grotesk'] text-[42px] font-medium leading-none tracking-[-2px] text-[#f1f1ee]">
              {total.toLocaleString()}
            </h2>

            {change && (
              <span className="mb-1 flex items-center gap-1 text-[10px] text-[#6fce91]">
                <ArrowUpRight size={12} />
                {change}
              </span>
            )}
          </div>

          <p className="mt-2 text-[11px] text-[#666d74]">
            Compared with the previous {days} days
          </p>
        </div>

        <div className="flex items-center gap-1 border border-[#252a2f] p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onDaysChange?.(period.value)}
              className={`px-3 py-1.5 text-[9px] font-medium ${
                days === period.value
                  ? "bg-[#315bea] text-white"
                  : "text-[#666d74] hover:text-[#f1f1ee]"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 h-[250px] w-full">
        <svg
          viewBox="0 0 825 210"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#315bea" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#315bea" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[20, 70, 120, 170].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="825"
              y2={y}
              stroke="#252a2f"
              strokeWidth="1"
            />
          ))}

          <polygon
            points={`0,210 ${points} 825,210`}
            fill="url(#chartFill)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#315bea"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="825" cy="14" r="4" fill="#315bea" />
          <circle cx="825" cy="14" r="7" fill="#315bea" opacity="0.15" />
        </svg>
      </div>

      <div className="mt-3 flex justify-between text-[9px] text-[#555c63]">
        {data.length > 0 ? (
          data
            .filter((_, i) => i % Math.max(Math.ceil(data.length / 6), 1) === 0)
            .slice(0, 6)
            .map((d) => (
              <span key={d.date}>
                {new Date(d.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ))
        ) : (
          <>
            <span>—</span>
            <span>—</span>
            <span>—</span>
            <span>—</span>
            <span>—</span>
            <span>—</span>
          </>
        )}
      </div>
    </div>
  );
}

// ---- Countries ----
function Countries({ data = [] }) {
  const limited = data.slice(0, 5);
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
            Audience
          </p>
          <h3 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
            Top locations
          </h3>
        </div>

        <Globe2 size={18} strokeWidth={1.5} className="text-[#555c63]" />
      </div>

      <div className="mt-7 space-y-5">
        {limited.length === 0 ? (
          <p className="text-[11px] text-[#555c63]">No data yet.</p>
        ) : (
          limited.map((country, index) => (
            <div key={country.code}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-[#555c63]">
                    {country.code}
                  </span>
                  <span className="text-[11px] text-[#d6d7d5]">
                    {country.name || country.code}
                  </span>
                </div>

                <span className="text-[10px] text-[#666d74]">
                  {country.views} · {country.percentage}%
                </span>
              </div>

              <div className="h-[3px] bg-[#20252a]">
                <div
                  className="h-full bg-[#315bea]"
                  style={{
                    width: `${country.percentage}%`,
                    opacity: Math.max(1 - index * 0.12, 0.55),
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <button className="mt-7 flex items-center gap-1 text-[10px] text-[#858b91] transition-colors hover:text-white">
        View all countries
        <ArrowUpRight size={12} />
      </button>
    </div>
  );
}

// ---- Recent visitors ----
function RecentVisitors({ data = [] }) {
  const limited = data.slice(0, 10);
  return (
    <div className="border border-[#252a2f] bg-[#111417]">
      <div className="flex items-center justify-between border-b border-[#252a2f] px-6 py-5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
            Live activity
          </p>
          <h3 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
            Recent visitors
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] text-[#6fce91]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6fce91]" />
          Live
        </div>
      </div>

      <div>
        {limited.length === 0 ? (
          <p className="px-6 py-6 text-[11px] text-[#555c63]">
            No visitors yet.
          </p>
        ) : (
          limited.map((visitor, index) => (
            <div
              key={`${visitor.created_at}-${index}`}
              className="group grid grid-cols-[1fr_auto] gap-4 border-b border-[#20252a] px-6 py-4 last:border-0 hover:bg-[#15191d]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#1a1f24] text-[#858b91]">
                  {visitor.device === "Mobile" ? (
                    <Smartphone size={14} />
                  ) : (
                    <Monitor size={14} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-[#dfe0dd]">
                    {visitor.location || "Unknown"}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] text-[#555c63]">
                    {visitor.page}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] text-[#666d74]">
                  {timeAgo(visitor.created_at)}
                </p>
                <p className="mt-0.5 text-[9px] text-[#4f565d]">
                  {visitor.device}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---- Main ----
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [live, setLive] = useState([]);
  const [days, setDays] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch stats + poll every 30s
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const r = await fetch(`/api/admin/stats?days=${days}`);
        const data = await r.json();
        if (!cancelled) {
          setStats(data);
          setLastUpdated(new Date());
        }
      } catch (err) {
        console.error("[dashboard] stats fetch failed:", err);
      }
    }

    load();
    const id = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [days]);

  // Fetch live visitors + poll every 15s
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const r = await fetch("/api/admin/live");
        const data = await r.json();
        if (!cancelled) setLive(data);
      } catch (err) {
        console.error("[dashboard] live fetch failed:", err);
      }
    }

    load();
    const id = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Refetch on tab focus
  useEffect(() => {
    function onFocus() {
      fetch(`/api/admin/stats?days=${days}`)
        .then((r) => r.json())
        .then(setStats)
        .catch(() => {});
      fetch("/api/admin/live")
        .then((r) => r.json())
        .then(setLive)
        .catch(() => {});
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [days]);

  if (!stats) {
    return (
     <Loading />
    );
  }

  const { summary, countries, chart } = stats;

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#f1f1ee]">
      <Sidebar />

      <main className="min-h-screen md:ml-[240px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#252a2f] bg-[#0b0d0f]/95 px-4 backdrop-blur sm:px-6 md:px-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
              Overview
            </p>
            <h1 className="mt-0.5 font-['Space_Grotesk'] text-[17px] font-medium">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border border-[#252a2f] px-3 py-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fce91]" />
              <span className="text-[9px] text-[#858b91]">
                Tracking active
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1 border border-[#252a2f] p-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-[9px] ${
                    days === d
                      ? "bg-[#315bea] text-white"
                      : "text-[#666d74] hover:text-white"
                  }`}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="px-5 py-7 md:px-8 md:py-9">
          {/* Intro */}
          <section className="mb-8">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] text-[#555c63]">
                  Good afternoon, Nosa.
                </p>

                <h2 className="mt-1 max-w-[600px] font-['Space_Grotesk'] text-[28px] font-medium leading-tight tracking-[-1.5px] sm:text-[30px] md:text-[38px]">
                  Your portfolio is getting attention.
                </h2>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#666d74]">
                <Activity size={13} />
                {lastUpdated
                  ? `Last updated ${timeAgo(lastUpdated)}`
                  : "Loading…"}
              </div>
            </div>
          </section>

          {/* Main stats */}
          <section className="grid gap-3 md:grid-cols-4">
            <Stat
              label="Total views"
              value={summary.totalViews.toLocaleString()}
              change={summary.change}
              icon={Eye}
              large
            />

            <Stat
              label="Unique visitors"
              value={summary.uniqueVisitors.toLocaleString()}
              icon={Users}
            />

            <Stat
              label="Countries"
              value={summary.countries}
              icon={Globe2}
            />

            <Stat
              label="Top location"
              value={countries[0]?.code || "—"}
              icon={MapPin}
            />
          </section>

          {/* Chart + quick insight */}
          <section className="mt-3 grid gap-3 xl:grid-cols-[1.65fr_.7fr]">
            <ViewsChart
              data={chart}
              total={summary.totalViews}
              change={summary.change}
              days={days}
              onDaysChange={setDays}
            />

            <div className="border border-[#252a2f] bg-[#111417] p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
                This month
              </p>

              <div className="mt-8">
                <p className="font-['Space_Grotesk'] text-[52px] font-medium leading-none tracking-[-3px]">
                  {summary.change}
                </p>

                <p className="mt-3 max-w-[210px] text-[11px] leading-[1.7] text-[#666d74]">
                  Your portfolio received more views than the previous 30-day
                  period.
                </p>
              </div>

              <div className="mt-10 border-t border-[#252a2f] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[1.2px] text-[#555c63]">
                    Best day
                  </span>

                  <span className="text-[10px] text-[#d6d7d5]">
                    {chart.length > 0
                      ? (() => {
                          const best = chart.reduce((a, b) =>
                            a.views > b.views ? a : b
                          );
                          return `${new Date(best.date).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )} · ${best.views} views`;
                        })()
                      : "—"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <ArrowUpRight size={14} className="text-[#6fce91]" />
                  <span className="text-[10px] text-[#6fce91]">
                    {summary.sessions} sessions
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom */}
          <section className="mt-3 grid gap-3 lg:grid-cols-[.75fr_1.25fr]">
            <Countries data={countries} />
            <RecentVisitors data={live} />
          </section>

          {/* Footer */}
          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-[#252a2f] pt-5 text-[9px] text-[#454b51] sm:flex-row">
            <span>DevbyNosa Admin</span>
            <span>Analytics · Portfolio · 2026</span>
          </footer>
        </div>
      </main>
    </div>
  );
}