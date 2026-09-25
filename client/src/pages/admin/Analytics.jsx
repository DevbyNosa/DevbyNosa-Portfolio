import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  ExternalLink,
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

// Icon map for devices
const DEVICE_ICONS = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Tablet: Tablet,
};

// ---- Section header ----
function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-[#555c63]">
          {eyebrow}
        </p>

        <h2 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
          {title}
        </h2>
      </div>

      {action && (
        <button className="flex items-center gap-1 text-[11px] text-[#666d74] transition-colors hover:text-white">
          {action}
          <ArrowUpRight size={12} />
        </button>
      )}
    </div>
  );
}

// ---- Stat card ----
function StatCard({ label, value, change, negative = false }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-5 transition-colors hover:border-[#30363c]">
      <p className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="font-['Space_Grotesk'] text-[31px] font-medium leading-none tracking-[-1.5px]">
          {value}
        </p>

        {change && (
          <span
            className={`mb-1 flex items-center gap-1 text-[11px] ${
              negative ? "text-[#e47d7d]" : "text-[#6fce91]"
            }`}
          >
            {negative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// ---- Views chart (same as dashboard) ----
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
            <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
              Traffic overview
            </p>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <h3 className="font-['Space_Grotesk'] text-[38px] font-medium leading-none tracking-[-2px]">
              {total.toLocaleString()}
            </h3>

            {change && (
              <span className="mb-1 flex items-center gap-1 text-[11px] text-[#6fce91]">
                <ArrowUpRight size={12} />
                {change}
              </span>
            )}
          </div>

          <p className="mt-2 text-[13px] text-[#555c63]">
            Total page views · Last {days} days
          </p>
        </div>

        <div className="flex h-fit items-center gap-1 border border-[#252a2f] p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onDaysChange?.(period.value)}
              className={`px-3 py-1.5 text-[11px] ${
                days === period.value
                  ? "bg-[#315bea] text-white"
                  : "text-[#666d74] hover:text-white"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 h-[270px]">
        <svg
          viewBox="0 0 825 200"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#315bea" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#315bea" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[20, 65, 110, 155].map((y) => (
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
            points={`0,200 ${points} 825,200`}
            fill="url(#analyticsFill)"
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
          <circle cx="825" cy="14" r="8" fill="#315bea" opacity="0.12" />
        </svg>
      </div>

      <div className="mt-3 flex justify-between text-[11px] text-[#454b51]">
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
  const limited = data.slice(0, 6);
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Audience" title="Countries" action="View all" />

      <div className="space-y-5">
        {limited.length === 0 ? (
          <p className="text-[13px] text-[#555c63]">No data yet.</p>
        ) : (
          limited.map((country, index) => (
            <div key={country.code}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 font-mono text-[12px] text-[#555c63]">
                    {country.code}
                  </span>
                  <span className="text-[14px] text-[#d6d7d5]">
                    {country.name || country.code}
                  </span>
                </div>

                <span className="text-[12px] text-[#666d74]">
                  {country.views} · {country.percentage}%
                </span>
              </div>

              <div className="h-[3px] bg-[#20252a]">
                <div
                  className="h-full bg-[#315bea]"
                  style={{
                    width: `${country.percentage}%`,
                    opacity: Math.max(1 - index * 0.1, 0.55),
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---- Top pages ----
function TopPages({ data = [] }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417]">
      <div className="border-b border-[#252a2f] px-6 py-5">
        <SectionHeader eyebrow="Content" title="Top pages" action="View pages" />
      </div>

      <div>
        {data.length === 0 ? (
          <p className="px-6 py-6 text-[13px] text-[#555c63]">No data yet.</p>
        ) : (
          data.slice(0, 5).map((page, index) => (
            <div
              key={page.page}
              className="flex items-center gap-4 border-b border-[#20252a] px-6 py-4 last:border-0 hover:bg-[#15191d]"
            >
              <span className="w-6 font-mono text-[11px] text-[#454b51]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-[#d6d7d5]">
                  {page.page === "/" ? "Home" : page.page.replace("/", "")}
                </p>
                <p className="mt-0.5 text-[11px] text-[#555c63]">{page.page}</p>
              </div>

              <div className="w-[100px]">
                <div className="h-[3px] bg-[#20252a]">
                  <div
                    className="h-full bg-[#315bea]"
                    style={{ width: `${Math.min(page.percentage * 2, 100)}%` }}
                  />
                </div>
              </div>

              <span className="w-14 text-right text-[11px] text-[#666d74]">
                {page.views}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---- Referrers ----
function Referrers({ data = [] }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Acquisition" title="Traffic sources" />

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-[13px] text-[#555c63]">No data yet.</p>
        ) : (
          data.slice(0, 5).map((item, index) => (
            <div key={item.source} className="flex items-center gap-3">
              <span className="w-4 font-mono text-[10px] text-[#454b51]">
                {index + 1}
              </span>
              <span className="flex-1 truncate text-[13px] text-[#c8cac7]">
                {item.source}
              </span>
              <span className="text-[11px] text-[#666d74]">{item.visits}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---- Devices ----
function Devices({ data = [] }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Technology" title="Devices" />

      <div className="space-y-5">
        {data.length === 0 ? (
          <p className="text-[13px] text-[#555c63]">No data yet.</p>
        ) : (
          data.map((device) => {
            const Icon = DEVICE_ICONS[device.label] || Monitor;

            return (
              <div key={device.label}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon size={14} className="text-[#666d74]" />
                  <span className="flex-1 text-[13px] text-[#c8cac7]">
                    {device.label}
                  </span>
                  <span className="text-[11px] text-[#666d74]">
                    {device.value}%
                  </span>
                </div>

                <div className="h-[3px] bg-[#20252a]">
                  <div
                    className="h-full bg-[#315bea]"
                    style={{ width: `${device.value}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ---- Browsers ----
function Browsers({ data = [] }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Technology" title="Browsers" />

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-[13px] text-[#555c63]">No data yet.</p>
        ) : (
          data.slice(0, 4).map((browser) => (
            <div key={browser.name} className="flex items-center gap-3">
              <Globe size={14} className="text-[#555c63]" />
              <span className="flex-1 text-[13px] text-[#c8cac7]">
                {browser.name}
              </span>
              <span className="text-[11px] text-[#666d74]">
                {browser.percentage}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ---- Main ----
export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [days, setDays] = useState(30);

  // Fetch stats + poll every 30s
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const r = await fetch(`/api/admin/stats?days=${days}`);
        const data = await r.json();
        if (!cancelled) setStats(data);
      } catch (err) {
        console.error("[analytics] fetch failed:", err);
      }
    }

    load();
    const id = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [days]);

  if (!stats) {
    return (
     <Loading />
    );
  }

  const { summary, countries, pages, referrers, devices, browsers, chart } = stats;
  const topCountry = countries[0];

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#f1f1ee]">
      <Sidebar />

      <main className="min-h-screen md:ml-[240px]">
        <div className="px-5 py-7 md:px-8 md:py-9">
          {/* HEADER */}
          <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#315bea]" />
                <p className="text-[10px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
                  Analytics
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Understand your audience.
              </h1>

              <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-[#555c63]">
                See where your visitors come from, what they view and how they
                interact with your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {[7, 30, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`px-4 py-2 text-[11px] ${
                      days === d
                        ? "bg-[#315bea] text-white"
                        : "text-[#858b91] hover:text-white"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7]">
                <ArrowUpRight size={13} />
                Export
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total views"
              value={summary.totalViews.toLocaleString()}
              change={summary.change}
            />

            <StatCard
              label="Unique visitors"
              value={summary.uniqueVisitors.toLocaleString()}
            />

            <StatCard
              label="Sessions"
              value={summary.sessions.toLocaleString()}
            />

            <StatCard
              label="Countries"
              value={summary.countries}
            />
          </section>

          {/* MAIN CHART */}
          <section className="mt-3">
            <ViewsChart
              data={chart}
              total={summary.totalViews}
              change={summary.change}
              days={days}
              onDaysChange={setDays}
            />
          </section>

          {/* AUDIENCE + PAGES */}
          <section className="mt-3 grid gap-3 xl:grid-cols-[.8fr_1.2fr]">
            <Countries data={countries} />
            <TopPages data={pages} />
          </section>

          {/* SOURCES + TECH */}
          <section className="mt-3 grid gap-3 md:grid-cols-3">
            <Referrers data={referrers} />
            <Devices data={devices} />
            <Browsers data={browsers} />
          </section>

          {/* LOCATION NOTE */}
          {topCountry && (
            <section className="mt-3 border border-[#252a2f] bg-[#111417] p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#252a2f] bg-[#171b1f]">
                    <MapPin size={15} className="text-[#315bea]" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555c63]">
                      Visitor intelligence
                    </p>

                    <h3 className="mt-1 font-['Space_Grotesk'] text-[17px] font-medium">
                      {topCountry.name || topCountry.code} is currently your
                      strongest audience.
                    </h3>

                    <p className="mt-1 max-w-[600px] text-[13px] leading-[1.6] text-[#555c63]">
                      {topCountry.percentage}% of your recorded portfolio
                      traffic is currently coming from{" "}
                      {topCountry.name || topCountry.code}.
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-[11px] text-[#858b91] hover:text-white">
                  Explore locations
                  <ExternalLink size={12} />
                </button>
              </div>
            </section>
          )}

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[11px] text-[#454b51]">
            Analytics data · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}