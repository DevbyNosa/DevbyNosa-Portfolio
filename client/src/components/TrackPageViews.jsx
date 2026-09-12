// components/TrackPageViews.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TrackPageViews() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Debug — remove once it's working
    console.log("[track] pathname:", pathname);

    // Skip any admin route
    const adminPrefixes = ["/admin", "/nosa-panel-x7k", "/dashboard"];
    if (adminPrefixes.some((p) => pathname.startsWith(p))) {
      console.log("[track] skipped (admin)");
      return;
    }

    if (navigator.doNotTrack === "1") return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}