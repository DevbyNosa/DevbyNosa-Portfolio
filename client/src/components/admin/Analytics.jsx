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

const countries = [
  { name: "Nigeria", code: "NG", views: 768, percentage: 62 },
  { name: "United States", code: "US", views: 174, percentage: 14 },
  { name: "United Kingdom", code: "GB", views: 111, percentage: 9 },
  { name: "Canada", code: "CA", views: 87, percentage: 7 },
  { name: "Germany", code: "DE", views: 49, percentage: 4 },
  { name: "Other", code: "--", views: 51, percentage: 4 },
];

const pages = [
  { page: "/", title: "Home", views: 521, percentage: 42 },
  { page: "/projects", title: "Projects", views: 318, percentage: 26 },
  { page: "/about", title: "About", views: 187, percentage: 15 },
  { page: "/writing", title: "Writing", views: 126, percentage: 10 },
  { page: "/contact", title: "Contact", views: 88, percentage: 7 },
];

const referrers = [
  { source: "Google", visits: 284 },
  { source: "LinkedIn", visits: 191 },
  { source: "X / Twitter", visits: 143 },
  { source: "Direct", visits: 112 },
  { source: "GitHub", visits: 76 },
];

const devices = [
  { label: "Desktop", value: 61, icon: Monitor },
  { label: "Mobile", value: 34, icon: Smartphone },
  { label: "Tablet", value: 5, icon: Tablet },
];

const browsers = [
  { name: "Chrome", percentage: 68, icon: Globe },
  { name: "Safari", percentage: 19, icon: Globe },
  { name: "Firefox", percentage: 9, icon: Globe },
  { name: "Edge", percentage: 4, icon: Globe },
];

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#555c63]">
          {eyebrow}
        </p>

        <h2 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
          {title}
        </h2>
      </div>

      {action && (
        <button className="flex items-center gap-1 text-[9px] text-[#666d74] transition-colors hover:text-white">
          {action}
          <ArrowUpRight size={11} />
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value, change, negative = false }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-5 transition-colors hover:border-[#30363c]">
      <p className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="font-['Space_Grotesk'] text-[31px] font-medium leading-none tracking-[-1.5px]">
          {value}
        </p>

        {change && (
          <span
            className={`mb-1 flex items-center gap-1 text-[9px] ${
              negative ? "text-[#e47d7d]" : "text-[#6fce91]"
            }`}
          >
            {negative ? (
              <ArrowDownRight size={11} />
            ) : (
              <ArrowUpRight size={11} />
            )}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function ViewsChart() {
  const points =
    "0,165 55,151 110,156 165,124 220,132 275,106 330,117 385,76 440,89 495,61 550,70 605,42 660,51 715,28 770,35 825,15";

  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6 md:p-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#315bea]" />

            <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
              Traffic overview
            </p>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <h3 className="font-['Space_Grotesk'] text-[38px] font-medium leading-none tracking-[-2px]">
              1,240
            </h3>

            <span className="mb-1 flex items-center gap-1 text-[9px] text-[#6fce91]">
              <ArrowUpRight size={11} />
              18.4%
            </span>
          </div>

          <p className="mt-2 text-[14px] text-[#555c63]">
            Total page views · Last 30 days
          </p>
        </div>

        <div className="flex h-fit items-center gap-1 border border-[#252a2f] p-1">
          {["7D", "30D", "90D"].map((period) => (
            <button
              key={period}
              className={`px-3 py-1.5 text-[9px] ${
                period === "30D"
                  ? "bg-[#315bea] text-white"
                  : "text-[#666d74] hover:text-white"
              }`}
            >
              {period}
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

          <circle cx="825" cy="15" r="4" fill="#315bea" />
          <circle cx="825" cy="15" r="8" fill="#315bea" opacity="0.12" />
        </svg>
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-[#454b51]">
        <span>Aug 10</span>
        <span>Aug 15</span>
        <span>Aug 20</span>
        <span>Aug 25</span>
        <span>Aug 30</span>
        <span>Sep 05</span>
      </div>
    </div>
  );
}

function Countries() {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Audience" title="Countries" action="View all" />

      <div className="space-y-5">
        {countries.map((country, index) => (
          <div key={country.name}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-5 font-mono text-[12px] text-[#555c63]">
                  {country.code}
                </span>

                <span className="text-[14px] text-[#d6d7d5]">
                  {country.name}
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
                  opacity: 1 - index * 0.1,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopPages() {
  return (
    <div className="border border-[#252a2f] bg-[#111417]">
      <div className="border-b border-[#252a2f] px-6 py-5">
        <SectionHeader eyebrow="Content" title="Top pages" action="View pages" />
      </div>

      <div>
        {pages.map((page, index) => (
          <div
            key={page.page}
            className="flex items-center gap-4 border-b border-[#20252a] px-6 py-4 last:border-0 hover:bg-[#15191d]"
          >
            <span className="w-5 font-mono text-[9px] text-[#454b51]">
              0{index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-[#d6d7d5]">
                {page.title}
              </p>

              <p className="mt-0.5 text-[9px] text-[#555c63]">{page.page}</p>
            </div>

            <div className="w-[100px]">
              <div className="h-[3px] bg-[#20252a]">
                <div
                  className="h-full bg-[#315bea]"
                  style={{ width: `${page.percentage * 2}%` }}
                />
              </div>
            </div>

            <span className="w-12 text-right text-[9px] text-[#666d74]">
              {page.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Referrers() {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Acquisition" title="Traffic sources" />

      <div className="space-y-4">
        {referrers.map((item, index) => (
          <div key={item.source} className="flex items-center gap-3">
            <span className="w-4 font-mono text-[8px] text-[#454b51]">
              {index + 1}
            </span>

            <span className="flex-1 text-[14px] text-[#c8cac7]">
              {item.source}
            </span>

            <span className="text-[9px] text-[#666d74]">{item.visits}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Devices() {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Technology" title="Devices" />

      <div className="space-y-5">
        {devices.map((device) => {
          const Icon = device.icon;

          return (
            <div key={device.label}>
              <div className="mb-2 flex items-center gap-2">
                <Icon size={13} className="text-[#666d74]" />

                <span className="flex-1 text-[14px] text-[#c8cac7]">
                  {device.label}
                </span>

                <span className="text-[9px] text-[#666d74]">
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
        })}
      </div>
    </div>
  );
}

function Browsers() {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-6">
      <SectionHeader eyebrow="Technology" title="Browsers" />

      <div className="space-y-4">
        {browsers.map((browser) => {
          const Icon = browser.icon;

          return (
            <div key={browser.name} className="flex items-center gap-3">
              <Icon size={13} className="text-[#555c63]" />

              <span className="flex-1 text-[14px] text-[#c8cac7]">
                {browser.name}
              </span>

              <span className="text-[9px] text-[#666d74]">
                {browser.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Analytics() {
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

              <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
                Analytics
              </p>
            </div>

            <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
              Understand your audience.
            </h1>

            <p className="mt-2 max-w-[520px] text-[11px] leading-[1.7] text-[#555c63]">
              See where your visitors come from, what they view and how they
              interact with your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white">
              Last 30 days
            </button>

            <button className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]">
              <ArrowUpRight size={12} />
              Export
            </button>
          </div>
        </header>

        {/* STATS */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total views" value="1,240" change="+18.4%" />

          <StatCard label="Unique visitors" value="876" change="+12.8%" />

          <StatCard label="Avg. session" value="2m 41s" change="+8.2%" />

          <StatCard
            label="Bounce rate"
            value="31.4%"
            change="-4.7%"
            negative
          />
        </section>

        {/* MAIN CHART */}
        <section className="mt-3">
          <ViewsChart />
        </section>

        {/* AUDIENCE + PAGES */}
        <section className="mt-3 grid gap-3 xl:grid-cols-[.8fr_1.2fr]">
          <Countries />
          <TopPages />
        </section>

        {/* SOURCES + TECH */}
        <section className="mt-3 grid gap-3 md:grid-cols-3">
          <Referrers />
          <Devices />
          <Browsers />
        </section>

        {/* LOCATION NOTE */}
        <section className="mt-3 border border-[#252a2f] bg-[#111417] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#252a2f] bg-[#171b1f]">
                <MapPin size={15} className="text-[#315bea]" />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-[#555c63]">
                  Visitor intelligence
                </p>

                <h3 className="mt-1 font-['Space_Grotesk'] text-[17px] font-medium">
                  Nigeria is currently your strongest audience.
                </h3>

                <p className="mt-1 max-w-[600px] text-[14px] leading-[1.6] text-[#555c63]">
                  62% of your recorded portfolio traffic is currently coming
                  from Nigeria.
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[9px] text-[#858b91] hover:text-white">
              Explore locations
              <ExternalLink size={11} />
            </button>
          </div>
        </section>

        <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[14px] text-[#454b51]">
          Analytics data · DevbyNosa
        </footer>
      </div>
    </main>
    </div>
  );
}