import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../../lib/api.js";
import Loading from "./Loading";
export default function ProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        await axios.get("/api/admin/auth/me", { withCredentials: true });
        if (!cancelled) setStatus("authed");
      } catch {
        if (!cancelled) setStatus("guest");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") return <Loading />;
  if (status === "guest") return <Navigate to="/admin" replace />;
  return <Outlet />;
}