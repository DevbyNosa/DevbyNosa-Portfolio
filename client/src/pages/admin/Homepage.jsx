import { useEffect, useState } from "react";
import axios from "../../lib/api.js";
import { Check, Globe, Save } from "lucide-react";
import Sidebar from "./SideBar";

const sections = [
  {
    key: "hero",
    title: "Hero",
    fields: [
      ["eyebrow", "Eyebrow"],
      ["title", "Headline"],
      ["description", "Description"],
      ["primaryCta", "Primary button"],
      ["secondaryCta", "Secondary button"],
      ["caption", "Caption"],
    ],
  },
  {
    key: "about",
    title: "About",
    fields: [["eyebrow", "Eyebrow"], ["title", "Heading"], ["accent", "Accent text"], ["body", "Body"], ["link", "Link label"]],
  },
  {
    key: "experience",
    title: "Experience heading",
    fields: [["eyebrow", "Eyebrow"], ["title", "Heading"], ["description", "Description"]],
  },
  {
    key: "contact",
    title: "Contact",
    fields: [["eyebrow", "Eyebrow"], ["title", "Heading"], ["description", "Description"], ["email", "Email address"]],
  },
];

function Field({ label, value, onChange, multiline }) {
  const className = "w-full border border-[#252a2f] bg-[#0b0d0f] px-3 py-2.5 text-[13px] text-[#f1f1ee] outline-none focus:border-[#315bea]";
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[9px] font-semibold uppercase tracking-[1.4px] text-[#555c63]">{label}</span>
      {multiline ? <textarea rows={4} className={className} value={value ?? ""} onChange={(e) => onChange(e.target.value)} /> : <input className={className} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

export default function Homepage() {
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axios.get("/api/content").then((res) => setContent(res.data?.data?.content ?? {})).catch(() => setFeedback("Could not load homepage content."));
  }, []);

  function update(section, field, value) {
    setContent((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
  }

  async function save(section) {
    setSaving(section);
    setFeedback("");
    try {
      await axios.patch(`/api/admin/content/${section}`, content[section]);
      setFeedback(`${section} section saved.`);
    } catch (error) {
      setFeedback(error.response?.data?.message || "Could not save this section.");
    } finally {
      setSaving("");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#f1f1ee]">
      <Sidebar />
      <main className="min-h-screen md:ml-[240px]">
        <div className="mx-auto max-w-[980px] px-5 py-7 md:px-8 md:py-9">
          <header className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-[#555c63]">Content management</p>
              <h1 className="mt-2 font-['Space_Grotesk'] text-[34px] font-medium tracking-[-1.7px]">Edit homepage.</h1>
              <p className="mt-2 text-[11px] leading-[1.7] text-[#666d74]">Update the words visitors see on your portfolio.</p>
            </div>
            <a href="/" className="flex items-center gap-2 border border-[#252a2f] px-3 py-2.5 text-[10px] text-[#858b91] hover:text-white"><Globe size={13} /> View site</a>
          </header>

          {feedback && <div className="mb-5 flex items-center gap-2 border border-[#6fce91]/40 bg-[#6fce91]/5 px-4 py-3 text-[12px] text-[#6fce91]"><Check size={14} />{feedback}</div>}

          <div className="space-y-4">
            {sections.map((section) => (
              <section key={section.key} className="border border-[#252a2f] bg-[#111417]">
                <div className="flex items-center justify-between border-b border-[#252a2f] px-5 py-4">
                  <h2 className="font-['Space_Grotesk'] text-[18px]">{section.title}</h2>
                  <button onClick={() => save(section.key)} disabled={saving === section.key} className="flex items-center gap-2 bg-[#315bea] px-3 py-2 text-[10px] text-white disabled:opacity-50"><Save size={13} />{saving === section.key ? "Saving" : "Save"}</button>
                </div>
                <div className="grid gap-5 p-5 md:grid-cols-2">
                  {section.fields.map(([field, label]) => <Field key={field} label={label} value={content[section.key]?.[field]} onChange={(value) => update(section.key, field, value)} multiline={field === "description" || field === "body" || field === "title" || field === "caption"} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
