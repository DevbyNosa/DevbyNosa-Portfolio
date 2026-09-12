import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/admin/login";
import Dashboard from "./components/admin/Dashboard";
import Analytics from "./components/admin/Analytics";
import AdminProjects from "./components/admin/Project";
import Blog from "./components/admin/Blog";
import Messages from "./components/admin/Message";
import TrackPageViews from "./components/TrackPageViews";

function App() {
  return (
    <>
      <TrackPageViews />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/writing" element={<Blog />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;