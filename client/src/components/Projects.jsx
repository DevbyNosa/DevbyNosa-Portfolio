import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import axios from "../lib/api.js";

// ─────────────────────────────────────────────
// Fake previews — used when a project has no image
// ─────────────────────────────────────────────
function BrowserChrome({ children }) {
  return (
    <div className="w-full overflow-hidden rounded-[5px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <div className="flex h-[26px] items-center gap-[5px] border-b border-[#eee] pl-3">
        <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#bbb]" />
      </div>
      {children}
    </div>
  );
}

function PreviewRelot() {
  return (
    <div className="p-4">
      <div className="font-['Space_Grotesk'] text-[12px] font-bold">RELOT</div>
      <div className="mt-[12px] bg-[#edf1f6] px-[20px] py-[35px]">
        <small className="text-[8px] tracking-[1px]">FIND YOUR NEXT HOME</small>
        <h3 className="mt-[8px] mb-[18px] font-['Space_Grotesk'] text-[22px] leading-none">
          Find a place
          <br />
          you'll love.
        </h3>
        <div className="border border-[#ddd] bg-white p-2 text-[9px] text-[#999]">
          Search properties...
        </div>
      </div>
      <div className="mt-[12px] flex gap-[8px]">
        <div className="h-[60px] flex-1 bg-[#e5e5e5]" />
        <div className="h-[60px] flex-1 bg-[#e5e5e5]" />
        <div className="h-[60px] flex-1 bg-[#e5e5e5]" />
      </div>
    </div>
  );
}

function PreviewStore() {
  return (
    <div className="p-5">
      <div className="flex justify-between text-[10px] font-bold">
        <span>NOSA STORE</span>
        <span className="font-normal">Cart (2)</span>
      </div>
      <div className="pt-[30px] pb-[20px]">
        <small className="text-[8px] tracking-[1px] text-[#777]">
          NEW COLLECTION
        </small>
        <h3 className="mt-[8px] mb-[20px] font-['Space_Grotesk'] text-[24px] leading-none">
          Everything
          <br />
          you actually want.
        </h3>
        <div className="flex gap-[10px]">
          <div className="h-[70px] w-[70px] bg-[#e7e3da]" />
          <div className="h-[70px] w-[70px] bg-[#e7e3da]" />
        </div>
      </div>
    </div>
  );
}

function PreviewAnalytics() {
  return (
    <div className="p-4">
      <div className="flex justify-between text-[10px] font-bold">
        <span>ANALYTICS</span>
        <span className="font-normal text-[#999]">Live</span>
      </div>
      <div className="mt-[12px] bg-[#f3f5f4] p-[18px]">
        <small className="text-[8px] tracking-[1px] text-[#777]">
          PORTFOLIO VIEWS
        </small>
        <h3 className="mt-[6px] font-['Space_Grotesk'] text-[28px] leading-none">
          1,240
        </h3>
        <svg viewBox="0 0 200 60" className="mt-3 h-[50px] w-full">
          <polyline
            points="0,50 20,42 40,45 60,30 80,35 100,20 120,25 140,12 160,18 180,8 200,4"
            fill="none"
            stroke="#315bea"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="mt-[12px] flex gap-[8px]">
        <div className="h-[50px] flex-1 bg-[#e7eae8]" />
        <div className="h-[50px] flex-1 bg-[#e7eae8]" />
      </div>
    </div>
  );
}

const FAKE_PREVIEWS = {
  relot: PreviewRelot,
  store: PreviewStore,
  analytics: PreviewAnalytics,
};

// Pick a fake preview based on the project's stack or index
function pickFakePreview(project, index) {
  const tags = (project.tags || []).map((t) => t.toLowerCase());
  const title = (project.title || "").toLowerCase();

  if (title.includes("real") || title.includes("relot") || tags.includes("express")) {
    return "relot";
  }
  if (title.includes("commerce") || title.includes("store") || tags.includes("react")) {
    return "store";
  }
  if (title.includes("analytic") || tags.includes("postgresql")) {
    return "analytics";
  }
  // Rotate based on index as last resort
  return ["relot", "store", "analytics"][index % 3];
}

function ProjectPreview({ preview }) {
  const Comp = FAKE_PREVIEWS[preview];
  return Comp ? <Comp /> : null;
}

// ─────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let cancelled = false;
  let intervalId;

  async function load() {
    try {
      const res = await axios.get('/api/projects?limit=6');
      const list = res.data?.data?.projects ?? [];
      if (!cancelled) setProjects(list);
    } catch (err) {
      console.error('[projects] fetch failed:', err);
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  
  load();

  
  intervalId = setInterval(() => {
    load();
  }, 10000); // 10 seconds

  
  return () => {
    cancelled = true;
    clearInterval(intervalId);
  };
}, []);


  return (
    <section
      id="projects"
      className="mx-auto my-[150px] w-[90%] max-w-[1200px]"
    >
      {/* Section Top */}
      <motion.div
        className="mb-[70px] flex flex-col justify-between gap-5 md:flex-row md:items-end"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <p className="font-sans text-[13px] font-semibold tracking-[1.8px] text-[#686868]">
            04 — SELECTED WORK
          </p>

          <h2 className="mt-[10px] font-['Space_Grotesk'] text-[45px] font-medium tracking-[-2px] md:text-[50px]">
            Things I've built.
          </h2>
        </div>

        <p className="max-w-[340px] font-sans text-[16px] leading-[1.7] text-[#686868]">
          A few projects I've worked on from idea to deployment.
        </p>
      </motion.div>

      {/* States */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#d8d7d2] border-t-[#171717]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center border border-[#d8d7d2]">
          <p className="text-[15px] text-[#686868]">No projects yet.</p>
        </div>
      ) : (
        <div className="grid gap-[28px] md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => {
            const fakePreview = p.image ? null : pickFakePreview(p, i);
            const tint = p.tint || ["bg-[#dfe5ed]", "bg-[#e3dfd5]", "bg-[#e0e6e3]"][i % 3];
            const tags = Array.isArray(p.tags) ? p.tags : [];
            const href = p.link || p.repo || "#";
            const displayId = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={p.id}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                {/* Preview */}
                <motion.div
                  className={`flex min-h-[260px] items-center justify-center overflow-hidden ${tint} p-5 md:min-h-[300px]`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BrowserChrome>
                      <ProjectPreview preview={fakePreview} />
                    </BrowserChrome>
                  )}
                </motion.div>

                {/* Details */}
                <div className="mt-[22px] flex flex-1 flex-col">
                  <div className="mb-[8px] text-[13px] text-[#315bea]">
                    {displayId}
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-[26px] font-medium tracking-[-1px]">
                    {p.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[16px] leading-[1.7] text-[#686868]">
                    {p.description}
                  </p>

                  {tags.length > 0 && (
                    <div className="mt-[18px] mb-[22px] flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] border border-[#d8d7d2] px-[10px] py-[6px] text-[12px] text-[#686868]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <motion.a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex w-fit items-center gap-1 border-b border-[#171717] pb-[3px] text-[15px] font-semibold transition-colors hover:text-[#315bea]"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View project
                    <ArrowUpRight size={17} strokeWidth={2} />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}