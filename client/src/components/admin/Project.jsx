import { useState } from "react";
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

const initialProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React, Tailwind CSS and Framer Motion.",
    tags: ["React", "Tailwind", "Framer Motion"],
    status: "Live",
    views: 521,
    link: "https://devbynosa.com",
    repo: "https://github.com/devbynosa/portfolio",
    image: "",
    updated: "Sep 02, 2026",
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description:
      "Admin dashboard for tracking portfolio traffic, devices and referrers.",
    tags: ["React", "Recharts", "Tailwind"],
    status: "Live",
    views: 318,
    link: "https://devbynosa.com/admin",
    repo: "https://github.com/devbynosa/analytics",
    image: "",
    updated: "Aug 28, 2026",
  },
  {
    id: 3,
    title: "Writing Engine",
    description:
      "MDX-powered blog with syntax highlighting and reading time.",
    tags: ["Next.js", "MDX"],
    status: "Draft",
    views: 126,
    link: "",
    repo: "https://github.com/devbynosa/writing",
    image: "",
    updated: "Aug 14, 2026",
  },
];

const statusStyles = {
  Live: "border-[#6fce91]/40 text-[#6fce91]",
  Draft: "border-[#e4c97d]/40 text-[#e4c97d]",
  Archived: "border-[#858b91]/40 text-[#858b91]",
};
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
function SectionHeader({ eyebrow, title, action, onAction }) {
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
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-[9px] text-[#666d74] transition-colors hover:text-white"
        >
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

function ProjectForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      description: "",
      tags: "",
      status: "Draft",
      link: "",
      repo: "",
      image: "",
    }
  );

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("image", reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
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
            {initial ? "Edit project" : "Add project"}
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
            placeholder="Project name"
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
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
            className="border border-[#252a2f] bg-[#0b0d0f] px-3 py-2 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
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
            placeholder="React, Tailwind, API"
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
            <option>Live</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Live link
          </span>
          <input
            value={form.link}
            onChange={(e) => update("link", e.target.value)}
            placeholder="https://..."
            className="h-[40px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
            Repository
          </span>
          <input
            value={form.repo}
            onChange={(e) => update("repo", e.target.value)}
            placeholder="https://github.com/..."
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

            {form.image && (
              <div className="flex items-center gap-3">
                <img
                  src={form.image}
                  alt="preview"
                  className="h-[40px] w-[64px] border border-[#252a2f] object-cover"
                />
                <button
                  type="button"
                  onClick={() => update("image", "")}
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
          {initial ? "Save changes" : "Add project"}
        </button>
      </div>
    </form>
  );
}

function ProjectCard({ project, onEdit, onDelete }) {
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
          className={`absolute right-3 top-3 border px-2 py-1 text-[9px] font-semibold uppercase tracking-[1.2px] ${
            statusStyles[project.status] || statusStyles.Draft
          } bg-[#0b0d0f]/80 backdrop-blur`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-['Space_Grotesk'] text-[15px] font-medium tracking-[-0.4px]">
            {project.title}
          </h3>

          <span className="flex shrink-0 items-center gap-1 text-[9px] text-[#666d74]">
            <Eye size={11} />
            {project.views}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[11px] leading-[1.6] text-[#666d74]">
          {project.description}
        </p>

        {project.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#252a2f] px-2 py-0.5 text-[9px] text-[#858b91]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-[#20252a] pt-4 text-[9px] text-[#555c63]">
          <span>Updated {project.updated}</span>

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
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#252a2f] py-2 text-[9px] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white"
          >
            <Pencil size={11} />
            Edit
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#252a2f] py-2 text-[9px] text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40"
          >
            <Trash2 size={11} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = projects.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
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

  function handleSave(data) {
    if (editing) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...data, updated: "Just now" } : p
        )
      );
    } else {
      setProjects((prev) => [
        {
          ...data,
          id: Date.now(),
          views: 0,
          updated: "Just now",
        },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
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
                {projects.length} projects
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
            <StatCard
              label="Total projects"
              value={projects.length}
              change="+2"
            />

            <StatCard
              label="Live"
              value={projects.filter((p) => p.status === "Live").length}
              change="+1"
            />

            <StatCard
              label="Total views"
              value={projects
                .reduce((sum, p) => sum + (p.views || 0), 0)
                .toLocaleString()}
              change="+18.4%"
            />

            <StatCard
              label="Drafts"
              value={projects.filter((p) => p.status === "Draft").length}
              change="-1"
              negative
            />
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
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-[#252a2f] bg-[#111417] py-20 text-center">
                <FolderKanban
                  size={36}
                  strokeWidth={1.2}
                  className="text-[#252a2f]"
                />
                <p className="mt-4 text-[12px] text-[#858b91]">
                  No projects found.
                </p>
                <button
                  onClick={handleAdd}
                  className="mt-4 flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
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