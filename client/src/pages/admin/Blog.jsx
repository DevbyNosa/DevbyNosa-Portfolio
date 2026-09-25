import { useState, useEffect, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Calendar,
} from "lucide-react";
import axios from "axios";
import Sidebar from "./SideBar";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const statusStyles = {
  published: "border-[#6fce91]/40 text-[#6fce91]",
  draft: "border-[#e4c97d]/40 text-[#e4c97d]",
  archived: "border-[#858b91]/40 text-[#858b91]",
};

const DEVICE_ICONS = {};

// ─────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────
function StatCard({ label, value, negative = false }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-5 transition-colors hover:border-[#30363c]">
      <p className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="font-['Space_Grotesk'] text-[34px] font-medium leading-none tracking-[-1.5px]">
          {value}
        </p>
        {negative && value > 0 && (
          <ArrowDownRight size={14} className="mb-1 text-[#e47d7d]" />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Post form
// ─────────────────────────────────────────────
function PostForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(() => ({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    tags: Array.isArray(initial?.tags) ? initial.tags.join(", ") : "",
    status: initial?.status ?? "draft",
    readTime: initial?.readTime ?? "",
    cover: initial?.cover ?? "",
  }));
  const [coverFile, setCoverFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autoSlug, setAutoSlug] = useState(!initial);

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && autoSlug) next.slug = slugify(value);
      return next;
    });
    if (error) setError("");
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB");
      return;
    }
    setCoverFile(file);
    update("cover", URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving || success) return;
    setError("");
    setSuccess("");

    if (!form.title.trim()) return setError("Title is required");
    if (!form.excerpt.trim()) return setError("Excerpt is required");
    if (!form.content.trim()) return setError("Content is required");

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("slug", form.slug || slugify(form.title));
      fd.append("excerpt", form.excerpt);
      fd.append("content", form.content);
      fd.append("tags", form.tags || "");
      fd.append("status", (form.status || "draft").toLowerCase());
      fd.append("read_time", form.readTime || "");
      if (coverFile) fd.append("cover", coverFile);

      const url = initial
        ? `/api/admin/blogs/${initial.id}`
        : "/api/admin/blogs";
      const method = initial ? "patch" : "post";

      const res = await axios[method](url, fd);

      const post = res.data?.data?.post ?? res.data?.post;
      if (!post) throw new Error("Invalid response from server");

      setSuccess(initial ? "Post updated" : "Post created");
      onSaved?.(post);
      setTimeout(() => onCancel?.(), 800);
    } catch (err) {
      console.error("[blog] save failed:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to save post"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#315bea]/40 bg-[#111417] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
            {initial ? "Edit" : "New"}
          </p>
          <h3 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
            {initial ? "Edit post" : "Write post"}
          </h3>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-[#666d74] transition-colors hover:text-white cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-3 border border-[#e47d7d]/40 bg-[#e47d7d]/5 px-4 py-3">
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e47d7d] text-[10px] font-bold text-[#0b0d0f]">
            !
          </div>
          <p className="text-[12px] leading-[1.5] text-[#e47d7d]">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-start gap-3 border border-[#6fce91]/40 bg-[#6fce91]/5 px-4 py-3">
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#6fce91] text-[10px] font-bold text-[#0b0d0f]">
            ✓
          </div>
          <p className="text-[12px] leading-[1.5] text-[#6fce91]">{success}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Title
          </span>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Post title"
            disabled={saving}
            className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Slug
          </span>
          <input
            value={form.slug}
            onChange={(e) => {
              setAutoSlug(false);
              update("slug", slugify(e.target.value));
            }}
            placeholder="post-url-slug"
            disabled={saving}
            className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 font-mono text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Excerpt
          </span>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="Short summary shown on the blog list"
            rows={2}
            disabled={saving}
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Content
          </span>
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="Write your post..."
            rows={10}
            disabled={saving}
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[13px] leading-[1.7] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Tags (comma separated)
          </span>
          <input
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="React, Design"
            disabled={saving}
            className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Status
          </span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            disabled={saving}
            className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Read time
          </span>
          <input
            value={form.readTime}
            onChange={(e) => update("readTime", e.target.value)}
            placeholder="5 min"
            disabled={saving}
            className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Cover image
          </span>

          <div className="flex items-center gap-4">
            <label className="flex h-[42px] cursor-pointer items-center gap-2 border border-[#252a2f] px-4 text-[12px] text-[#858b91] transition-colors hover:text-white">
              <Upload size={14} />
              Choose file
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {form.cover && (
              <div className="flex items-center gap-3">
                <img
                  src={form.cover}
                  alt="preview"
                  className="h-[42px] w-[68px] border border-[#252a2f] object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverFile(null);
                    update("cover", "");
                  }}
                  className="text-[11px] text-[#e47d7d] hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="border border-[#252a2f] px-4 py-2.5 text-[11px] text-[#858b91] hover:text-white disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving || !!success}
          className="cursor-pointer flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving…
            </>
          ) : success ? (
            <>✓ {initial ? "Updated" : "Created"}</>
          ) : (
            <>
              <Plus size={12} />
              {initial ? "Save changes" : "Create post"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Post row
// ─────────────────────────────────────────────
function PostRow({ post, onEdit, onDelete }) {
  const status = (post.status || "draft").toLowerCase();
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#20252a] px-6 py-4 last:border-0 hover:bg-[#15191d]">
      {/* Thumbnail */}
      <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden border border-[#252a2f] bg-[#0e1114]">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText size={20} className="text-[#252a2f]" strokeWidth={1.4} />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-['Space_Grotesk'] text-[16px] font-medium tracking-[-0.3px]">
            {post.title}
          </h3>

          <span
            className={`shrink-0 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[1.2px] ${
              statusStyles[status] || statusStyles.draft
            }`}
          >
            {status}
          </span>
        </div>

        <p className="mt-1 truncate font-mono text-[12px] text-[#555c63]">
          /{post.slug}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#666d74]">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {timeAgo(post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={11} />
            {post.views ?? 0}
          </span>
          {post.readTime && <span>{post.readTime}</span>}
        </div>

        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#252a2f] px-2 py-0.5 text-[10px] text-[#858b91]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onEdit(post)}
          title="Edit"
          className="flex h-9 w-9 items-center justify-center border border-[#252a2f] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white cursor-pointer"
        >
          <Pencil size={13} />
        </button>

        <button
          onClick={() => onDelete(post.id)}
          title="Delete"
          className="flex h-9 w-9 items-center justify-center border border-[#252a2f] text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40 cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Fetch from API
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get("/api/admin/blogs");
        const list = res.data?.data?.blogs ?? res.data?.blogs ?? [];
        if (!cancelled) setPosts(list);
      } catch (err) {
        console.error("[blog] fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((p) => {
      if (!p?.title) return false;
      const matchesQuery =
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? "").toLowerCase().includes(q) ||
        (p.slug ?? "").toLowerCase().includes(q);
      const status = (p.status || "draft").toLowerCase();
      const matchesFilter = filter === "All" || status === filter.toLowerCase();
      return matchesQuery && matchesFilter;
    });
  }, [posts, query, filter]);

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(post) {
    setEditing(post);
    setShowForm(true);
  }

  function handleSaved(saved) {
    if (!saved?.id) return;
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      return exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev];
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this post?")) return;
    const backup = posts;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    try {
      await axios.delete(`/api/admin/blogs/${id}`);
    } catch (err) {
      console.error("[blog] delete failed:", err);
      setPosts(backup);
    }
  }

  const counts = {
    total: posts.length,
    published: posts.filter((p) => (p.status || "").toLowerCase() === "published").length,
    draft: posts.filter((p) => (p.status || "").toLowerCase() === "draft").length,
    archived: posts.filter((p) => (p.status || "").toLowerCase() === "archived").length,
  };

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
                  Writing
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Publish your thoughts.
              </h1>

              <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-[#555c63]">
                Write, edit and manage the posts that appear on your blog.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="border border-[#252a2f] px-4 py-2.5 text-[11px] text-[#858b91] hover:text-white">
                {posts.length} posts
              </button>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7] cursor-pointer"
              >
                <Plus size={13} />
                New post
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total posts" value={counts.total} />
            <StatCard label="Published" value={counts.published} />
            <StatCard label="Drafts" value={counts.draft} negative />
            <StatCard label="Archived" value={counts.archived} />
          </section>

          {/* FORM */}
          {showForm && (
            <section className="mt-3">
              <PostForm
                initial={editing}
                onCancel={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                onSaved={handleSaved}
              />
            </section>
          )}

          {/* TOOLBAR */}
          <section className="mt-3 border border-[#252a2f] bg-[#111417] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="h-[42px] w-full border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] md:max-w-[360px]"
              />

              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {["All", "Published", "Draft", "Archived"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 text-[12px] ${
                      filter === item
                        ? "bg-[#315bea] text-white"
                        : "text-[#666d74] hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* LIST */}
          <section className="mt-3 border border-[#252a2f] bg-[#111417]">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-[13px] text-[#666d74]">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#315bea]" />
                  Loading posts…
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileText size={40} strokeWidth={1.2} className="text-[#252a2f]" />
                <p className="mt-4 text-[13px] text-[#858b91]">
                  {posts.length === 0
                    ? "No posts yet."
                    : "No posts match your filter."}
                </p>
                <button
                  onClick={handleAdd}
                  className="mt-4 flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7] cursor-pointer"
                >
                  <Plus size={13} />
                  Write your first post
                </button>
              </div>
            ) : (
              filtered.map((post) => (
                <PostRow
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </section>

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[11px] text-[#454b51]">
            Writing · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}