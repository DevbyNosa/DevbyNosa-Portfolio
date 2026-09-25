import { useEffect, useState } from "react";
import axios from "axios";

const fallback = {
  hero: { eyebrow: "HELLO, I'M IGBINOSA NOSAKHARE JUDGES.", title: "I build websites\n& web applications.", description: "Full-stack developer based in Nigeria, turning ideas into useful digital products with clean code and thoughtful interfaces.", primaryCta: "See my work", secondaryCta: "Let's work together", caption: "Full-stack developer\n& professional bug creator." },
  about: { eyebrow: "02 — A LITTLE ABOUT ME", title: "I enjoy building the", accent: "complicated stuff.", body: "Give me a database, an API, authentication, payments and a problem to solve and I'm happy. I'm interested in building products that are actually useful - not just websites that look nice.", link: "More about me" },
  experience: { eyebrow: "03 — WORK EXPERIENCE", title: "What I've been working on.", description: "Building real-world web applications, learning through projects, and turning ideas into working products." },
  contact: { eyebrow: "06 — LET'S TALK", title: "Let's build something good.", description: "Have a project in mind, an idea you want to bring to life, or just want to talk about building something?", email: "judgesnigbinosa@gmail.com" },
};

export function useHomepageContent() {
  const [content, setContent] = useState(fallback);
  useEffect(() => {
    let cancelled = false;
    axios.get("/api/content").then((res) => {
      if (!cancelled) setContent({ ...fallback, ...(res.data?.data?.content ?? {}) });
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return content;
}
