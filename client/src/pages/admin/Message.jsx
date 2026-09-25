import { useState, useEffect, useMemo } from "react";
import {
  Mail,
  MailOpen,
  Star,
  Archive,
  Trash2,
  Search,
  Inbox,
} from "lucide-react";
import axios from "../../lib/api.js";
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
  });
}

function StatCard({ label, value, change, negative = false }) {
  return (
    <div className="border border-[#252a2f] bg-[#111417] p-5 transition-colors hover:border-[#30363c]">
      <p className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="font-['Space_Grotesk'] text-[34px] font-medium leading-none tracking-[-1.5px]">
          {value}
        </p>

        {change && (
          <span
            className={`mb-1 text-[11px] ${
              negative ? "text-[#e47d7d]" : "text-[#6fce91]"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function MessageListItem({ message, active, onClick }) {
  const initials = (message.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`w-full border-b border-[#20252a] px-5 py-4 text-left transition-colors last:border-0 ${
        active ? "bg-[#15191d]" : "hover:bg-[#15191d]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1f24] text-[13px] font-semibold text-[#858b91]">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`truncate text-[14px] ${
                message.isRead
                  ? "font-medium text-[#c8cac7]"
                  : "font-semibold text-[#f1f1ee]"
              }`}
            >
              {message.name}
            </p>

            <span className="shrink-0 text-[11px] text-[#555c63]">
              {timeAgo(message.createdAt)}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            {!message.isRead && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#315bea]" />
            )}

            <p
              className={`truncate text-[13px] ${
                message.isRead ? "text-[#666d74]" : "text-[#d6d7d5]"
              }`}
            >
              {message.subject || "(no subject)"}
            </p>
          </div>

          <p className="mt-1 truncate text-[12px] text-[#555c63]">
            {message.body?.slice(0, 80) || ""}
          </p>

          {message.isStarred && (
            <div className="mt-2 flex items-center gap-1">
              <Star size={11} className="fill-[#e4c97d] text-[#e4c97d]" />
              <span className="text-[10px] uppercase tracking-[1.2px] text-[#555c63]">
                Starred
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageDetail({ message, onBack, onStar, onArchive, onDelete }) {
  const initials = (message.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[#252a2f] px-6 py-4">
        <button
          onClick={onBack}
          className="text-[12px] text-[#858b91] transition-colors hover:text-white lg:hidden"
        >
          ← Back
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => onStar(message.id)}
            title={message.isStarred ? "Unstar" : "Star"}
            className={`flex h-9 w-9 items-center justify-center border border-[#252a2f] transition-colors hover:border-[#315bea]/40 ${
              message.isStarred
                ? "text-[#e4c97d]"
                : "text-[#858b91] hover:text-white"
            }`}
          >
            <Star
              size={14}
              className={message.isStarred ? "fill-[#e4c97d]" : ""}
            />
          </button>

          <button
            onClick={() => onArchive(message.id)}
            title={message.isArchived ? "Unarchive" : "Archive"}
            className="flex h-9 w-9 items-center justify-center border border-[#252a2f] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white"
          >
            <Archive size={14} />
          </button>

          <button
            onClick={() => onDelete(message.id)}
            title="Delete"
            className="flex h-9 w-9 items-center justify-center border border-[#252a2f] text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h2 className="font-['Space_Grotesk'] text-[24px] font-medium tracking-[-1px]">
          {message.subject || "(no subject)"}
        </h2>

        <div className="mt-5 flex items-center gap-3 border-b border-[#20252a] pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#315bea] text-[13px] font-semibold text-white">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[#f1f1ee]">
              {message.name}
            </p>
            <p className="truncate text-[12px] text-[#666d74]">
              {message.email}
            </p>
          </div>

          <span className="shrink-0 text-[11px] text-[#555c63]">
            {timeAgo(message.createdAt)}
          </span>
        </div>

        <div className="mt-6 whitespace-pre-line text-[15px] leading-[1.85] text-[#c8cac7]">
          {message.body}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <Mail size={48} strokeWidth={1.2} className="text-[#252a2f]" />
      <p className="mt-4 text-[14px] text-[#858b91]">
        Select a message to read
      </p>
      <p className="mt-1 text-[12px] text-[#555c63]">
        Pick a conversation from the list on the left.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Inbox");

  // Fetch from API
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get("/api/admin/messages");
        const list = res.data?.data?.messages ?? res.data?.messages ?? [];
        if (!cancelled) setMessages(list);
      } catch (err) {
        console.error("[messages] fetch failed:", err);
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
    return messages.filter((m) => {
      const matchesQuery =
        (m.name || "").toLowerCase().includes(q) ||
        (m.email || "").toLowerCase().includes(q) ||
        (m.subject || "").toLowerCase().includes(q) ||
        (m.body || "").toLowerCase().includes(q);

      let matchesFilter = true;
      if (filter === "Inbox") matchesFilter = !m.isArchived;
      else if (filter === "Unread") matchesFilter = !m.isRead && !m.isArchived;
      else if (filter === "Starred") matchesFilter = m.isStarred && !m.isArchived;
      else if (filter === "Archived") matchesFilter = m.isArchived;

      return matchesQuery && matchesFilter;
    });
  }, [messages, query, filter]);

  const selected = messages.find((m) => m.id === selectedId) || null;
  const unreadCount = messages.filter(
    (m) => !m.isRead && !m.isArchived
  ).length;

  function updateLocal(id, patch) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  }

  function openMessage(id) {
    setSelectedId(id);
    const current = messages.find((m) => m.id === id);
    if (current && !current.isRead) {
      updateLocal(id, { isRead: true });
      axios.patch(`/api/admin/messages/${id}/read`).catch((err) => {
        console.error("[messages] mark read failed:", err);
        updateLocal(id, { isRead: false }); // rollback
      });
    }
  }

  function toggleStar(id) {
    const current = messages.find((m) => m.id === id);
    if (!current) return;
    const next = !current.isStarred;
    updateLocal(id, { isStarred: next });
    axios.patch(`/api/admin/messages/${id}/star`).catch((err) => {
      console.error("[messages] star failed:", err);
      updateLocal(id, { isStarred: !next }); // rollback
    });
  }

  function toggleArchive(id) {
    const current = messages.find((m) => m.id === id);
    if (!current) return;
    const next = !current.isArchived;
    updateLocal(id, { isArchived: next });
    setSelectedId(null);
    axios.patch(`/api/admin/messages/${id}/archive`).catch((err) => {
      console.error("[messages] archive failed:", err);
      updateLocal(id, { isArchived: !next }); // rollback
    });
  }

  async function deleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    const backup = messages;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
    try {
      await axios.delete(`/api/admin/messages/${id}`);
    } catch (err) {
      console.error("[messages] delete failed:", err);
      setMessages(backup); // rollback
    }
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
                <p className="text-[10px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
                  Messages
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Your inbox.
              </h1>

              <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-[#555c63]">
                Read and organise messages from people who reach out through
                your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-[#252a2f] px-4 py-2.5 text-[12px] text-[#858b91]">
                <Inbox size={14} />
                {unreadCount} unread
              </div>

              <button className="border border-[#252a2f] px-4 py-2.5 text-[12px] text-[#858b91] hover:text-white">
                {messages.length} total
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total messages" value={messages.length} />
            <StatCard
              label="Unread"
              value={unreadCount}
              negative={unreadCount > 0}
            />
            <StatCard
              label="Starred"
              value={messages.filter((m) => m.isStarred).length}
            />
            <StatCard
              label="Archived"
              value={messages.filter((m) => m.isArchived).length}
            />
          </section>

          {/* TOOLBAR */}
          <section className="mt-3 border border-[#252a2f] bg-[#111417] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-[360px]">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#555c63]"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="h-[42px] w-full border border-[#252a2f] bg-[#0b0d0f] pl-10 pr-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
                />
              </div>

              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {["Inbox", "Unread", "Starred", "Archived"].map((item) => (
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

          {/* SPLIT VIEW */}
          <section className="mt-3 grid min-h-[640px] gap-3 lg:grid-cols-[400px_1fr]">
            {/* List */}
            <div className="border border-[#252a2f] bg-[#111417]">
              <div className="flex items-center justify-between border-b border-[#252a2f] px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
                  {filter}
                </p>
                <span className="text-[11px] text-[#555c63]">
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="max-h-[700px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex items-center gap-3 text-[13px] text-[#666d74]">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#315bea]" />
                      Loading…
                    </div>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MailOpen
                      size={32}
                      strokeWidth={1.3}
                      className="text-[#252a2f]"
                    />
                    <p className="mt-3 text-[13px] text-[#858b91]">
                      {messages.length === 0
                        ? "No messages yet."
                        : "No messages match your filter."}
                    </p>
                  </div>
                ) : (
                  filtered.map((message) => (
                    <MessageListItem
                      key={message.id}
                      message={message}
                      active={message.id === selectedId}
                      onClick={() => openMessage(message.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Detail */}
            <div className="border border-[#252a2f] bg-[#111417]">
              {selected ? (
                <MessageDetail
                  message={selected}
                  onBack={() => setSelectedId(null)}
                  onStar={toggleStar}
                  onArchive={toggleArchive}
                  onDelete={deleteMessage}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </section>

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[11px] text-[#454b51]">
            Messages · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}