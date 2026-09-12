import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  MailOpen,
  Star,
  Archive,
  Trash2,
  Search,
  Send,
  Inbox,
  Reply,
  User,
  Clock,
} from "lucide-react";
import Sidebar from "./SideBar";

const initialMessages = [
  {
    id: 1,
    name: "Amaka Obi",
    email: "amaka@studio.co",
    subject: "Freelance project inquiry",
    preview: "Hi Nosa, I came across your portfolio and I'd love to...",
    body:
      "Hi Nosa,\n\nI came across your portfolio and I'd love to discuss a freelance project with you. We're building a small SaaS dashboard and need help with the frontend.\n\nWould you be open to a quick call this week?\n\nBest,\nAmaka",
    date: "2 min ago",
    read: false,
    starred: true,
    archived: false,
  },
  {
    id: 2,
    name: "Daniel Reed",
    email: "daniel.reed@mail.com",
    subject: "Collaboration on open source",
    preview: "Hey! I'm working on a React component library and thought...",
    body:
      "Hey!\n\nI'm working on a React component library and thought your design sense would be a great fit. Would you be interested in collaborating?\n\nNo pressure — happy to share the repo first.\n\nDaniel",
    date: "18 min ago",
    read: false,
    starred: false,
    archived: false,
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah@designweekly.io",
    subject: "Feature request: Analytics dashboard",
    preview: "We loved your analytics dashboard article. Would you be open...",
    body:
      "We loved your analytics dashboard article. Would you be open to writing a follow-up piece for our newsletter?\n\nWe can pay per word and give you full editorial control.\n\nSarah",
    date: "1 hr ago",
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: 4,
    name: "Michael O.",
    email: "michael@devmail.com",
    subject: "Question about your Tailwind setup",
    preview: "Quick question — how did you structure the color tokens in...",
    body:
      "Quick question — how did you structure the color tokens in your admin panel? I'm rebuilding something similar and want to keep it consistent.\n\nThanks!",
    date: "3 hr ago",
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: 5,
    name: "Lena Park",
    email: "lena@recruit.io",
    subject: "Frontend role — remote",
    preview: "Hi Nosa, we're hiring a senior frontend engineer and your...",
    body:
      "Hi Nosa,\n\nWe're hiring a senior frontend engineer and your portfolio stood out. Fully remote, flexible hours.\n\nInterested in hearing more?\n\nLena",
    date: "Yesterday",
    read: true,
    starred: true,
    archived: false,
  },
  {
    id: 6,
    name: "Dev Newsletter",
    email: "hello@devnews.co",
    subject: "Weekly digest #142",
    preview: "This week: React 20, Tailwind v5, and a new Vite plugin...",
    body:
      "This week: React 20, Tailwind v5, and a new Vite plugin worth trying.\n\nRead the full issue on our site.",
    date: "2 days ago",
    read: true,
    starred: false,
    archived: true,
  },
];

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

function MessageListItem({ message, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-b border-[#20252a] px-5 py-4 text-left transition-colors last:border-0 ${
        active ? "bg-[#15191d]" : "hover:bg-[#15191d]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1f24] text-[11px] font-semibold text-[#858b91]">
          {message.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`truncate text-[12px] ${
                message.read
                  ? "font-medium text-[#c8cac7]"
                  : "font-semibold text-[#f1f1ee]"
              }`}
            >
              {message.name}
            </p>

            <span className="shrink-0 text-[9px] text-[#555c63]">
              {message.date}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            {!message.read && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#315bea]" />
            )}

            <p
              className={`truncate text-[11px] ${
                message.read ? "text-[#666d74]" : "text-[#d6d7d5]"
              }`}
            >
              {message.subject}
            </p>
          </div>

          <p className="mt-1 truncate text-[10px] text-[#555c63]">
            {message.preview}
          </p>

          {message.starred && (
            <div className="mt-2 flex items-center gap-1">
              <Star
                size={10}
                className="fill-[#e4c97d] text-[#e4c97d]"
              />
              <span className="text-[8px] uppercase tracking-[1.2px] text-[#555c63]">
                Starred
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageDetail({ message, onBack, onReply, onStar, onArchive, onDelete }) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  function submitReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    onReply(message.id, reply.trim());
    setReply("");
    setShowReply(false);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[#252a2f] px-6 py-4">
        <button
          onClick={onBack}
          className="text-[10px] text-[#858b91] transition-colors hover:text-white md:hidden"
        >
          ← Back
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => onStar(message.id)}
            title={message.starred ? "Unstar" : "Star"}
            className={`flex h-8 w-8 items-center justify-center border border-[#252a2f] transition-colors hover:border-[#315bea]/40 ${
              message.starred ? "text-[#e4c97d]" : "text-[#858b91] hover:text-white"
            }`}
          >
            <Star
              size={13}
              className={message.starred ? "fill-[#e4c97d]" : ""}
            />
          </button>

          <button
            onClick={() => onArchive(message.id)}
            title={message.archived ? "Unarchive" : "Archive"}
            className="flex h-8 w-8 items-center justify-center border border-[#252a2f] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white"
          >
            <Archive size={13} />
          </button>

          <button
            onClick={() => onDelete(message.id)}
            title="Delete"
            className="flex h-8 w-8 items-center justify-center border border-[#252a2f] text-[#e47d7d] transition-colors hover:border-[#e47d7d]/40"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h2 className="font-['Space_Grotesk'] text-[20px] font-medium tracking-[-0.8px]">
          {message.subject}
        </h2>

        <div className="mt-4 flex items-center gap-3 border-b border-[#20252a] pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#315bea] text-[12px] font-semibold text-white">
            {message.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-[#f1f1ee]">
              {message.name}
            </p>
            <p className="truncate text-[10px] text-[#666d74]">
              {message.email}
            </p>
          </div>

          <span className="shrink-0 text-[9px] text-[#555c63]">
            {message.date}
          </span>
        </div>

        <div className="mt-5 whitespace-pre-line text-[13px] leading-[1.8] text-[#c8cac7]">
          {message.body}
        </div>

        {/* Reply */}
        <div className="mt-8 border-t border-[#20252a] pt-6">
          {!showReply ? (
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-2 border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] transition-colors hover:border-[#315bea]/40 hover:text-white"
            >
              <Reply size={12} />
              Reply
            </button>
          ) : (
            <form onSubmit={submitReply}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
                  Reply to {message.name}
                </p>

                <button
                  type="button"
                  onClick={() => setShowReply(false)}
                  className="text-[9px] text-[#666d74] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                rows={5}
                autoFocus
                className="w-full border border-[#252a2f] bg-[#0b0d0f] px-3 py-3 text-[12px] leading-[1.7] text-[#f1f1ee] outline-none focus:border-[#315bea]"
              />

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[9px] font-medium text-white hover:bg-[#3b63e7]"
                >
                  <Send size={12} />
                  Send reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <Mail size={40} strokeWidth={1.2} className="text-[#252a2f]" />
      <p className="mt-4 text-[12px] text-[#858b91]">
        Select a message to read
      </p>
      <p className="mt-1 text-[10px] text-[#555c63]">
        Pick a conversation from the list on the left.
      </p>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Inbox"); // Inbox | Unread | Starred | Archived

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase()) ||
        m.subject.toLowerCase().includes(query.toLowerCase()) ||
        m.preview.toLowerCase().includes(query.toLowerCase());

      let matchesFilter = true;
      if (filter === "Inbox") matchesFilter = !m.archived;
      else if (filter === "Unread") matchesFilter = !m.read && !m.archived;
      else if (filter === "Starred") matchesFilter = m.starred && !m.archived;
      else if (filter === "Archived") matchesFilter = m.archived;

      return matchesQuery && matchesFilter;
    });
  }, [messages, query, filter]);

  const selected = messages.find((m) => m.id === selectedId) || null;
  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  function openMessage(id) {
    setSelectedId(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  }

  function toggleStar(id) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  }

  function toggleArchive(id) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, archived: !m.archived } : m))
    );
    setSelectedId(null);
  }

  function deleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function replyTo(id, text) {
    alert(`Reply sent to message #${id}:\n\n${text}`);
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
                  Messages
                </p>
              </div>

              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
                Your inbox.
              </h1>

              <p className="mt-2 max-w-[520px] text-[11px] leading-[1.7] text-[#555c63]">
                Read, reply to and organise messages from people who reach out
                through your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91]">
                <Inbox size={12} />
                {unreadCount} unread
              </div>

              <button className="border border-[#252a2f] px-4 py-2.5 text-[9px] text-[#858b91] hover:text-white">
                {messages.length} total
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total messages"
              value={messages.length}
              change="+6"
            />

            <StatCard
              label="Unread"
              value={unreadCount}
              change="+2"
              negative={unreadCount > 0}
            />

            <StatCard
              label="Starred"
              value={messages.filter((m) => m.starred).length}
              change="+1"
            />

            <StatCard
              label="Archived"
              value={messages.filter((m) => m.archived).length}
              change="0%"
            />
          </section>

          {/* TOOLBAR */}
          <section className="mt-3 border border-[#252a2f] bg-[#111417] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-[320px]">
                <Search
                  size={13}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#555c63]"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="h-[40px] w-full border border-[#252a2f] bg-[#0b0d0f] pl-9 pr-3 text-[12px] text-[#f1f1ee] outline-none focus:border-[#315bea]"
                />
              </div>

              <div className="flex items-center gap-1 border border-[#252a2f] p-1">
                {["Inbox", "Unread", "Starred", "Archived"].map((item) => (
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

          {/* SPLIT VIEW */}
          <section className="mt-3 grid min-h-[560px] gap-3 lg:grid-cols-[380px_1fr]">
            {/* List */}
            <div className="border border-[#252a2f] bg-[#111417]">
              <div className="flex items-center justify-between border-b border-[#252a2f] px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[1.6px] text-[#666d74]">
                  {filter}
                </p>
                <span className="text-[9px] text-[#555c63]">
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MailOpen
                      size={28}
                      strokeWidth={1.3}
                      className="text-[#252a2f]"
                    />
                    <p className="mt-3 text-[11px] text-[#858b91]">
                      No messages here.
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
                  onReply={replyTo}
                  onStar={toggleStar}
                  onArchive={toggleArchive}
                  onDelete={deleteMessage}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </section>

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[9px] text-[#454b51]">
            Messages · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}