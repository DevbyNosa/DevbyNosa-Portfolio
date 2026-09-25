import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react";
import axios from "../../lib/api.js";
import Sidebar from "./SideBar";

// ─────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────
function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="border border-[#252a2f] bg-[#111417]">
      <div className="flex items-start gap-4 border-b border-[#252a2f] px-6 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#292e33] bg-[#171b1f] text-[#8b9299]">
          <Icon size={15} strokeWidth={1.7} />
        </div>

        <div>
          <h2 className="font-['Space_Grotesk'] text-[17px] font-medium tracking-[-0.5px]">
            {title}
          </h2>
          <p className="mt-0.5 text-[12px] text-[#666d74]">{description}</p>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Field
// ─────────────────────────────────────────────
function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">
        {label}
      </span>
      {children}
      {hint && <span className="text-[11px] text-[#555c63]">{hint}</span>}
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="h-[42px] border border-[#252a2f] bg-[#0b0d0f] px-3 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea] disabled:opacity-60"
    />
  );
}

// ─────────────────────────────────────────────
// Feedback
// ─────────────────────────────────────────────
function Feedback({ type, message }) {
  if (!message) return null;

  const styles =
    type === "success"
      ? "border-[#6fce91]/40 bg-[#6fce91]/5 text-[#6fce91]"
      : "border-[#e47d7d]/40 bg-[#e47d7d]/5 text-[#e47d7d]";

  return (
    <div className={`flex items-start gap-3 border px-4 py-3 ${styles}`}>
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        {type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
      </div>
      <p className="text-[12px] leading-[1.5]">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState({
    type: "",
    message: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get("/api/admin/auth/me");
        const u = res.data?.data?.user;
        if (!cancelled && u) {
          setUser(u);
          setProfile({ name: u.name || "", email: u.email || "" });
        }
      } catch (err) {
        console.error("[settings] load failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleProfileSave(e) {
    e.preventDefault();
    if (profileSaving) return;
    setProfileFeedback({ type: "", message: "" });

    if (!profile.name.trim() || !profile.email.trim()) {
      setProfileFeedback({ type: "error", message: "Name and email are required" });
      return;
    }

    setProfileSaving(true);

    try {
      const res = await axios.patch("/api/admin/auth/me", {
        name: profile.name,
        email: profile.email,
      });

      const updated = res.data?.data?.user;
      if (updated) setUser(updated);

      setProfileFeedback({
        type: "success",
        message: "Profile updated successfully",
      });
    } catch (err) {
      console.error("[settings] profile save failed:", err);
      setProfileFeedback({
        type: "error",
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update profile",
      });
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSave(e) {
    e.preventDefault();
    if (passwordSaving) return;
    setPasswordFeedback({ type: "", message: "" });

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordFeedback({
        type: "error",
        message: "All fields are required",
      });
      return;
    }

    if (passwords.next.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "Password must be at least 8 characters",
      });
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setPasswordFeedback({
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    setPasswordSaving(true);

    try {
      await axios.patch("/api/admin/update-password", {
        current: passwords.current,
        next: passwords.next,
      });

      setPasswords({ current: "", next: "", confirm: "" });
      setPasswordFeedback({
        type: "success",
        message: "Password changed successfully",
      });

     setTimeout(() => {
        setPasswordFeedback({ type: "", message: "" });
      }, 5000);
    } catch (err) {
      console.error("[settings] password save failed:", err);
      setPasswordFeedback({
        type: "error",
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to change password",
      });

      setTimeout(() => {
        setPasswordFeedback({ type: "", message: "" });
      }, 5000);
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#f1f1ee]">
      <Sidebar />

      <main className="min-h-screen md:ml-[240px]">
        <div className="px-5 py-7 md:px-8 md:py-9">
          {/* HEADER */}
          <header className="mb-8">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#315bea]" />
              <p className="text-[10px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">
                Settings
              </p>
            </div>

            <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">
              Account settings.
            </h1>

            <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-[#555c63]">
              Manage your profile, password and preferences.
            </p>
          </header>

          {loading ? (
            <div className="flex items-center justify-center border border-[#252a2f] bg-[#111417] py-20">
              <div className="flex items-center gap-3 text-[12px] text-[#666d74]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#315bea]" />
                Loading…
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {/* Profile */}
              <Section
                icon={User}
                title="Profile"
                description="Your name and email shown across the admin panel."
              >
                <form onSubmit={handleProfileSave} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name">
                      <TextInput
                        value={profile.name}
                        onChange={(e) => {
                          setProfile((p) => ({ ...p, name: e.target.value }));
                          if (profileFeedback.message)
                            setProfileFeedback({ type: "", message: "" });
                        }}
                        placeholder="Your name"
                        disabled={profileSaving}
                      />
                    </Field>

                    <Field label="Email">
                      <TextInput
                        type="email"
                        value={profile.email}
                        onChange={(e) => {
                          setProfile((p) => ({ ...p, email: e.target.value }));
                          if (profileFeedback.message)
                            setProfileFeedback({ type: "", message: "" });
                        }}
                        placeholder="you@example.com"
                        disabled={profileSaving}
                      />
                    </Field>
                  </div>

                  {profileFeedback.message && (
                    <Feedback
                      type={profileFeedback.type}
                      message={profileFeedback.message}
                    />
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {profileSaving ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Saving…
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </button>
                  </div>
                </form>
              </Section>

              {/* Password */}
              <Section
                icon={Lock}
                title="Password"
                description="Change your password. Use at least 8 characters."
              >
                <form onSubmit={handlePasswordSave} className="grid gap-4">
                  <Field label="Current password">
                    <TextInput
                      type="password"
                      value={passwords.current}
                      onChange={(e) => {
                        setPasswords((p) => ({ ...p, current: e.target.value }));
                        if (passwordFeedback.message)
                          setPasswordFeedback({ type: "", message: "" });
                      }}
                      placeholder="Enter current password"
                      disabled={passwordSaving}
                      autoComplete="current-password"
                    />
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="New password">
                      <TextInput
                        type="password"
                        value={passwords.next}
                        onChange={(e) => {
                          setPasswords((p) => ({ ...p, next: e.target.value }));
                          if (passwordFeedback.message)
                            setPasswordFeedback({ type: "", message: "" });
                        }}
                        placeholder="At least 8 characters"
                        disabled={passwordSaving}
                        autoComplete="new-password"
                      />
                    </Field>

                    <Field label="Confirm new password">
                      <TextInput
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => {
                          setPasswords((p) => ({ ...p, confirm: e.target.value }));
                          if (passwordFeedback.message)
                            setPasswordFeedback({ type: "", message: "" });
                        }}
                        placeholder="Repeat new password"
                        disabled={passwordSaving}
                        autoComplete="new-password"
                      />
                    </Field>
                  </div>

                  {passwordFeedback.message && (
                    <Feedback
                      type={passwordFeedback.type}
                      message={passwordFeedback.message}
                    />
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="flex items-center gap-2 bg-[#315bea] px-4 py-2.5 text-[11px] font-medium text-white hover:bg-[#3b63e7] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {passwordSaving ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Saving…
                        </>
                      ) : (
                        "Change password"
                      )}
                    </button>
                  </div>
                </form>
              </Section>

              {/* Session info */}
              <Section
                icon={Shield}
                title="Session"
                description="You're signed in with a session that expires after 30 minutes of inactivity."
              >
                <div className="grid gap-3 text-[13px]">
                  <div className="flex items-center justify-between border-b border-[#20252a] pb-3">
                    <span className="text-[#858b91]">Signed in as</span>
                    <span className="text-[#d6d7d5]">{user?.email || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#20252a] pb-3">
                    <span className="text-[#858b91]">Session timeout</span>
                    <span className="text-[#d6d7d5]">30 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#858b91]">Cookie</span>
                    <span className="text-[#d6d7d5]">
                      httpOnly · sameSite: lax
                    </span>
                  </div>
                </div>
              </Section>
            </div>
          )}

          <footer className="mt-10 border-t border-[#252a2f] pt-5 text-[11px] text-[#454b51]">
            Settings · DevbyNosa
          </footer>
        </div>
      </main>
    </div>
  );
}