import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/admin/login";
import Dashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";
import AdminProjects from "./pages/admin/Project";
import Blog from "./pages/admin/Blog";
import Messages from "./pages/admin/Message";
import SettingsPage from "./pages/admin/Settings";
import TrackPageViews from "./components/TrackPageViews";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Sidebar from "./pages/admin/SideBar";
import Homepage from "./pages/admin/Homepage";
import BlogPost from "./pages/admin/BlogPost";

function App() {
  return (
    <>
      <TrackPageViews />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/writing/:slug" element={<BlogPost />} />

        <Route path="/admin" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/homepage" element={<Homepage />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/writing" element={<Blog />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;