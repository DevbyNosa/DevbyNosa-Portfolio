import { useState } from "react";
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
  ExternalLink,
  Calendar,
} from "lucide-react";
import Sidebar from "./SideBar";

const initialPosts = [
  {
    id: 1,
    title: "Building a Portfolio That Stands Out",
    slug: "building-a-portfolio-that-stands-out",
    excerpt:
      "What I learned while designing and shipping my own developer portfolio from scratch.",
    content:
      "Full article body goes here. You can write in plain text or wire this up to an MDX renderer later.",
    tags: ["Design", "Career"],
    status: "Published",
    views: 412,
    readTime: "6 min",
    cover: "",
    date: "Sep 02, 2026",
    updated: "Sep 02, 2026",
  },
  {
    id: 2,
    title: "Why I Switched to React Router",
    slug: "why-i-switched-to-react-router",
    excerpt:
      "A short breakdown of the routing setup powering my admin panel.",
    content:
      "Full article body goes here.",
    tags: ["React", "Routing"],
    status: "Published",
    views: 287,
    readTime: "4 min",
    cover: "",
    date: "Aug 21, 2026",
    updated: "Aug 24, 2026",
  },
  {
    id: 3,
    title: "Notes on Writing Consistently",
    slug: "notes-on-writing-consistently",
    excerpt:
      "A draft about habit-building, publishing cadence, and shipping rough work.",
    content:
      "Still drafting this one.",
    tags: ["Writing"],
    status: "Draft",
    views: 0,
    readTime: "3 min",
    cover: "",
    date: "Aug 10, 2026",
    updated: "Aug 10, 2026",
  },
];

const statusStyles = {
  Published: "border-[#6fce91]/40 text-[#6fce91]",
  Draft: "border-[#e4c97d]/40 text-[#e4c97d]",
  Archived: "border-[#858b91]/40 text-[#858b91]",
};

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

function PostForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: "",
      status: "Draft",
      readTime: "",
      cover: "",
    }
  );
  const [autoSlug, setAutoSlug] = useState(!initial);

  function update(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && autoSlug) next.slug = slugify(value);
      return next;
    });
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("cover", reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
      slug: form.slug || slugify(form.title),
      tags:
        typeof form.tags === "string"
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : form.tags,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#315bea]/40 bg-[#111417] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
            {initial ? "Edit" : "New"}
          </p>
          <h3 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
            {initial ? "Edit post" : "Write post"}
          </h3>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-[#666d74] transition-colors hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Title
          </span>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Post title"
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Slug
          </span>
          <input
            value={form.slug}
            onChange={(e) => {
              setAutoSlug(false);
              update("slug", slugify(e.target.value));
            }}
            placeholder="post-url-slug"
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 font-mono text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Excerpt
          </span>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="Short summary shown on the blog list"
            rows={2}
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Content
          </span>
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="Write your post..."
            rows={8}
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[12px] leading-[1.7] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Tags (comma separated)
          </span>
          <input
            value={
              Array.isArray(form.tags) ? form.tags.join(", ") : form.tags
            }
            onChange={(e) => update("tags", e.target.value)}
            placeholder="React, Design"
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Status
          </span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          >
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Read time
          </span>
          <input
            value={form.readTime}
            onChange={(e) => update("readTime", e.target.value)}
            placeholder="5 min"
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Cover image
          </span>

          <div className="flex items-center gap-4">
            <label className="flex h-[40px] cursor-pointer items-center gap-2 border border-[#252a2f] px-4 text-[11px] text-[#858b91] transition-colors hover:text-white">
              <Upload size={13} />
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
                  className="h-[40px] w-[64px] border border-[#252a2f] object-cover"
                />
                <button
                  type="button"
                  onClick={() => update("cover", "")}
                  className="text-[10px] text-[#e47d7d] hover:underline"
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
          className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
        >
          <Plus size={12} />
          {initial ? "Save changes" : "Publish post"}
        </button>
      </div>
    </form>
  );
}

function PostRow({ post, onEdit, onDelete }) {
  return (
    <div className="group flex items-center gap-4 border-b border-[#20252a] px-6 py-4 last:border-0 hover:bg-[#15191d]">
      <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden border border-[#252a2f] bg-[#0e1114]">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText size={18} className="text-[#252a2f]" strokeWidth={1.4} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-['Space_Grotesk'] text-[14px] font-medium tracking-[-0.3px]">
            {post.title}
          </h3>

          <span
            className={`shrink-0 border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[1.2px] ${
              statusStyles[post.status] || statusStyles.Draft
            }`}
          >
            {post.status}
          </span>
        </div>

        <p className="mt-1 truncate text-[10px] text-[#555c63]">
          /{post.slug}
        </p>

        {post.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#252a2f] px-1.5 py-0.5 text-[8px] text-[#858b91]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="hidden w-[110px] shrink-0 text-right md:block">
        <p className="flex items-center justify-end gap-1 text-[9px] text-[#666d74]">
          <Calendar size={10} />
          {post.date}
        </p>
        <p className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#555c63]">
          <Eye size={10} />
          {post.views} · {post.readTime || "—"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onEdit(post)}
          title="Edit"
          className="flex h-8 w-8 items-center justify-center border border-[#252a2f] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white"
        >
          <Pencil size={12} />
        </button>

        <button
          onClick={() => onDelete(post.id)}
          title="Delete"
          className="flex h-8 w-8 items-center justify-center border border-[#252a2f] text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = posts.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.slug.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
    return matchesQuery && matchesFilter;
  });

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(post) {
    setEditing(post);
    setShowForm(true);
  }

  function handleSave(data) {
    if (editing) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...data, updated: "Just now" } : p
        )
      );
    } else {
      setPosts((prev) => [
        {
          ...data,
          id: Date.now(),
          views: 0,
          date: "Just now",
          updated: "Just now",
        },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id) {
    if (!confirm("Delete this post?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

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
                  Writing
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Publish your thoughts.
              </h1>

              <p className="mt-2 max-w-[520px] text-[11px] leading-[1.7] text-[#555c63]">
                Write, edit and manage the posts that appear on your blog.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white">
                {posts.length} posts
              </button>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
              >
                <Plus size={12} />
                New post
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total posts" value={posts.length} change="+1" />

            <StatCard
              label="Published"
              value={posts.filter((p) => p.status === "Published").length}
              change="+1"
            />

            <StatCard
              label="Total views"
              value={posts
                .reduce((sum, p) => sum + (p.views || 0), 0)
                .toLocaleString()}
              change="+22.6%"
            />

            <StatCard
              label="Drafts"
              value={posts.filter((p) => p.status === "Draft").length}
              change="-1"
              negative
            />
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
                onSave={handleSave}
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
                className="h-[40px] w-full border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] md:max-w-[320px]"
              />

              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {["All", "Published", "Draft", "Archived"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-3 py-1.5 text-[9px] ${
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
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileText
                  size={36}
                  strokeWidth={1.2}
                  className="text-[#252a2f]"
                />
                <p className="mt-4 text-[12px] text-[#858b91]">
                  No posts found.
                </p>
                <button
                  onClick={handleAdd}
                  className="mt-4 flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
                >
                  <Plus size={12} />
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

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[9px] text-[#454b51]">
            Writing · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}