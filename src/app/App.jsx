import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/features/home/pages/HomePage.jsx";
import { AboutPage } from "@/features/about/pages/AboutPage.jsx";
import { MilkyWayPage } from "@/features/herogallery/pages/MilkyWayPage.jsx";
import { NaturePage } from "@/features/herogallery/pages/NaturePage.jsx";
import { PortraitPage } from "@/features/herogallery/pages/PortraitPage.jsx";

import Login from "@/features/auth/components/LoginForm.jsx";
import AuthListener from "@/features/auth/components/AuthListener.jsx";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute.jsx";
import AdminDashboard from "@/features/admin/components/AdminDashboard.jsx";
import { SiteLayout } from "@/features/layout/pages/SiteLayout.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Keeps auth state in sync on every route change. */}
      <AuthListener />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public auth page (no main site layout). */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin page (requires authenticated access). */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Legacy admin URL redirect to canonical route. */}
        <Route
          path="/AdminDashboard"
          element={<Navigate to="/admin" replace />}
        />

        {/* Main website pages rendered with shared navbar/footer layout. */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/night" element={<MilkyWayPage />} />
          <Route path="/nature" element={<NaturePage />} />
          <Route path="/portrait" element={<PortraitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
