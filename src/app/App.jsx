import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "@/features/home/pages/HomePage.jsx";
import { AboutPage } from "@/features/about/pages/AboutPage.jsx";
import { MilkyWayPage } from "@/features/herogallery/pages/MilkyWayPage.jsx";
import { NaturePage } from "@/features/herogallery/pages/NaturePage.jsx";
import { PortraitPage } from "@/features/herogallery/pages/PortraitPage.jsx";

import Login from "@/features/auth/components/LoginForm";
import { SiteLayout } from "@/features/layout/pages/ SiteLayout.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* NO navbar/footer here */}
        <Route path="/login" element={<Login />} />

        {/* Everything inside SiteLayout HAS navbar/footer */}
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
