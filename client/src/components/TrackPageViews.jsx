import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


const IGNORED = ["/health", "/favicon.ico", "/robots.txt", "/admin/"];
const DEDUPE_MS = 30 * 60 * 1000;   // 30 min

export default function TrackPageViews() {
  const { pathname } = useLocation();
  const trackedRef = useRef(new Map());

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (IGNORED.includes(pathname)) return;
    if (navigator.doNotTrack === "1") return;

   
    const last = trackedRef.current.get(pathname);
    if (last && Date.now() - last < DEDUPE_MS) return;

    trackedRef.current.set(pathname, Date.now());

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}