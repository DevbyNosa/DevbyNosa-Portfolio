import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  FolderKanban,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  ExternalLink,
} from "lucide-react";
import Sidebar from "./SideBar";
import axios from "../../lib/api.js";

// ─────────────────────────────────────────────
// Status styles
// ─────────────────────────────────────────────
const statusStyles = {
  live: "border-[#6fce91]/40 text-[#6fce91]",
  draft: "border-[#e4c97d]/40 text-[#e4c97d]",
  archived: "border-[#858b91]/40 text-[#858b91]",
};

// ─────────────────────────────────────────────
// GitHub icon 
// ─────────────────────────────────────────────
const Github = ({ size = 14, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.07.78 2.16v3.21c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

// ─────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────
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
            {negative ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Form
// ─────────────────────────────────────────────
function ProjectForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(() => ({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    stack: Array.isArray(initial?.tags)
      ? initial.tags.join(", ")
      : initial?.stack ?? "",
    status: initial?.status ?? initial?.project_status ?? "draft",
    domain: initial?.link ?? initial?.domain ?? "",
    github: initial?.repo ?? initial?.github ?? "",
    image: initial?.image ?? "",
  }));

  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB");
      return;
    }
    setImageFile(file);
    update("image", URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving || success) return;
    setError("");
    setSuccess("");

    if (!form.title.trim()) return setError("Title is required");
    if (!form.description.trim()) return setError("Description is required");

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("stack", form.stack || "");
      fd.append("status", (form.status || "draft").toLowerCase());
      fd.append("github", form.github || "");
      fd.append("domain", form.domain || "");
      if (imageFile) fd.append("image", imageFile);

      const url = initial
        ? `/api/admin/projects/${initial.id}`
        : "/api/admin/projects";
      const method = initial ? "patch" : "post";

      const res = await axios[method](url, fd);

      // Backend wraps: { statusCode, success, message, data: { project } }
      const project = res.data?.data?.project ?? res.data?.project;
      if (!project) throw new Error("Invalid response from server");

      setSuccess(initial ? "Project updated" : "Project added");
      onSaved?.(project);

      setTimeout(() => onCancel?.(), 800);
    } catch (err) {
      console.error("[project] save failed:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to save project"
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
          <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
            {initial ? "Edit" : "New"}
          </p>
          <h3 className="mt-1 font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
            {initial ? "Edit project" : "Add project"}
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
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Title
          </span>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Project name"
            disabled={saving}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Description
          </span>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Short description"
            rows={3}
            disabled={saving}
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Stack (comma separated)
          </span>
          <input
            value={form.stack}
            onChange={(e) => update("stack", e.target.value)}
            placeholder="React, Tailwind, API"
            disabled={saving}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Status
          </span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            disabled={saving}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          >
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Live link
          </span>
          <input
            value={form.domain}
            onChange={(e) => update("domain", e.target.value)}
            placeholder="https://..."
            disabled={saving}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Repository
          </span>
          <input
            value={form.github}
            onChange={(e) => update("github", e.target.value)}
            placeholder="https://github.com/..."
            disabled={saving}
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
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

            {form.image && (
              <div className="flex items-center gap-3">
                <img
                  src={form.image}
                  alt="preview"
                  className="h-[40px] w-[64px] border border-[#252a2f] object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    update("image", "");
                  }}
                  className="text-[10px] text-[#e47d7d] hover:underline cursor-pointer"
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
          className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving || !!success}
          className="cursor-pointer flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving…
            </>
          ) : success ? (
            <>✓ {initial ? "Updated" : "Added"}</>
          ) : (
            <>
              <Plus size={12} />
              {initial ? "Save changes" : "Add project"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────
function ProjectCard({ project, onEdit, onDelete }) {
  const status = (project.status ?? project.project_status ?? "draft").toLowerCase();
  const stack = Array.isArray(project.tags)
    ? project.tags
    : Array.isArray(project.stack)
    ? project.stack
    : [];

  return (
    <div className="group flex flex-col border border-[#252a2f] bg-[#111417] transition-colors hover:border-[#30363c]">
      <div className="relative h-[140px] w-full overflow-hidden border-b border-[#252a2f] bg-[#0e1114]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#252a2f]">
            <FolderKanban size={40} strokeWidth={1.2} />
          </div>
        )}

        <span
          className={`absolute right-3 top-3 border px-2 py-1 text-[9px] font-semibold uppercase tracking-[1.2px]
           
            ${
           
            statusStyles[status] || statusStyles.draft
          } bg-[#0b0d0f]/80 backdrop-blur`}
        >
        {status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-['Space_Grotesk'] text-[18px] font-medium tracking-[-0.4px]">
            {project.title}
          </h3>

          <span className="flex shrink-0 items-center gap-1 text-[11px] text-[#666d74]">
            <Eye size={11} />
            {project.views ?? 0}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-[#666d74]">
          {project.description}
        </p>

        {stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((tag) => (
              <span
                key={tag}
                className="border border-[#252a2f] px-2 py-0.5 text-[11px] text-[#858b91]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-[#20252a] pt-4 text-[11px] text-[#555c63]">
          <span>
            Updated {project.updated_at ? new Date(project.updated_at).toLocaleString() : "just now"}
          </span>

          <div className="flex items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-[#666d74] transition-colors hover:text-white"
                title="Repository"
              >
                <Github size={13} />
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-[#666d74] transition-colors hover:text-white"
                title="Live site"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onEdit(project)}
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#252a2f] py-2 text-[12px] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white cursor-pointer"
          >
            <Pencil size={11} />
            Edit
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#252a2f] py-2 text-[12px] cursor-pointer text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40"
          >
            <Trash2 size={11} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get("/api/admin/projects");
        const list = res.data?.data?.projects ?? res.data?.projects ?? [];
        if (!cancelled) setProjects(list);
      } catch (err) {
        console.error("[projects] fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = projects.filter((p) => {
    if (!p || !p.title) return false;
    const q = query.toLowerCase();
    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q);
    const status = (p.status ?? p.project_status ?? "draft").toLowerCase();
    const matchesFilter = filter === "All" || status === filter.toLowerCase();
    return matchesQuery && matchesFilter;
  });

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(project) {
    setEditing(project);
    setShowForm(true);
  }

  function handleSaved(saved) {
    if (!saved?.id) {
      console.error("[projects] invalid saved project:", saved);
      return;
    }
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      return exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev];
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/admin/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("[projects] delete failed:", err);
      alert("Failed to delete project");
    }
  }

  const counts = {
    total: projects.length,
    live: projects.filter((p) => (p.status ?? p.project_status ?? "draft").toLowerCase() === "live").length,
    draft: projects.filter((p) => (p.status ?? p.project_status ?? "draft").toLowerCase() === "draft").length,
    archived: projects.filter((p) => (p.status ?? p.project_status ?? "draft").toLowerCase() === "archived").length,
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
                <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
                  Projects
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Manage your work.
              </h1>

              <p className="mt-2 max-w-[520px] text-[11px] leading-[1.7] text-[#555c63]">
                Upload, edit and organise the projects shown on your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white">
                {counts.total} projects
              </button>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
              >
                <Plus size={12} />
                Add project
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total projects" value={counts.total} />
            <StatCard label="Live" value={counts.live} />
            <StatCard label="Drafts" value={counts.draft} negative />
            <StatCard label="Archived" value={counts.archived} />
          </section>

          {/* FORM */}
          {showForm && (
            <section className="mt-3">
              <ProjectForm
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
                placeholder="Search projects..."
                className="h-[40px] w-full border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea] md:max-w-[320px]"
              />

              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {["All", "Live", "Draft", "Archived"].map((item) => (
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

          {/* GRID */}
          <section className="mt-3">
            {loading ? (
              <div className="flex items-center justify-center border border-[#252a2f] bg-[#111417] py-20">
                <div className="flex items-center gap-3 text-[12px] text-[#666d74]">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#315bea]" />
                  Loading projects…
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-[#252a2f] bg-[#111417] py-20 text-center">
                <FolderKanban size={36} strokeWidth={1.2} className="text-[#252a2f]" />
                <p className="mt-4 text-[12px] text-[#858b91]">
                  {projects.length === 0
                    ? "No projects yet."
                    : "No projects match your search."}
                </p>
                <button
                  onClick={handleAdd}
                  className="mt-4 flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7] cursor-pointer

              "
                >
                  <Plus size={12} />
                  Add your first project
                </button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[9px] text-[#454b51]">
            Projects · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}