import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─────────────────────────────────────────────
// Post row
// ─────────────────────────────────────────────
function PostRow({ post, index }) {
  const displayId = String(index + 1).padStart(2, "0");
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const meta = [tags[0], post.readTime].filter(Boolean).join(" · ");
  const href = post.slug ? `/writing/${post.slug}` : "#";

  return (
    <motion.article
      className="group grid gap-5 border-b border-[#d8d7d2] py-[30px] md:grid-cols-[.15fr_auto_1fr_.25fr] md:items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: "easeOut",
      }}
    >
      {/* Number */}
      <p className="text-[16px] text-[#686868]">{displayId}</p>

      {/* Cover image */}
      <div className="h-[80px] w-[120px] shrink-0 overflow-hidden border border-[#d8d7d2] bg-[#efeeea] md:h-[90px] md:w-[140px]">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[1.5px] text-[#b5b3ac]">
            {tags[0] || "POST"}
          </div>
        )}
      </div>

      {/* Title + excerpt */}
      <div>
        <h3 className="font-['Space_Grotesk'] text-[25px] font-medium tracking-[-1px] transition-colors group-hover:text-[#315bea]">
          {post.title}
        </h3>

        <p className="mt-2 max-w-[600px] text-[16px] leading-[1.6] text-[#686868]">
          {post.excerpt}
        </p>
      </div>

      {/* Meta + arrow */}
      <div className="flex items-center justify-between md:justify-end md:gap-5">
        <span className="text-[14px] text-[#686868]">
          {meta || formatDate(post.createdAt)}
        </span>


       <Link to={`/writing/${post.slug}`}>
        <ArrowUpRight size={17} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>

      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function Writing() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get("/api/blogs?limit=6");
        const list = res.data?.data?.blogs ?? [];
        if (!cancelled) setPosts(list);
      } catch (err) {
        console.error("[blogs] fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="writing"
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
            05 — WRITING
          </p>

          <h2 className="mt-[10px] font-['Space_Grotesk'] text-[45px] font-medium tracking-[-2px] md:text-[50px]">
            Thoughts on building.
          </h2>
        </div>

        <p className="max-w-[340px] font-sans text-[16px] leading-[1.7] text-[#686868]">
          Things I've learned while building, debugging and figuring out
          software.
        </p>
      </motion.div>

      {/* Posts */}
      <div className="border-t border-[#d8d7d2]">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#d8d7d2] border-t-[#171717]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-[15px] text-[#686868]">No posts yet.</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <PostRow key={post.id} post={post} index={i} />
          ))
        )}
      </div>
    </section>
  );
}