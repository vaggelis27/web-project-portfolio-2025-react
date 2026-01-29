// src/app/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import { Navbar } from "@/features/layout/components/Navbar.jsx";
import { Footer } from "@/features/layout/components/Footer.jsx";
import { ScrollToTop } from "@/features/layout/components/ScrollToTop.jsx";
import { WeatherBadge } from "@/features/layout/components/WeatherBadge.jsx";

// pages
import { HomePage } from "@/features/home/pages/HomePage.jsx";
import { AboutPage } from "@/features/about/pages/AboutPage.jsx";
import { MilkyWayPage } from "@/features/herogallery/pages/MilkyWayPage.jsx";
import { NaturePage } from "@/features/herogallery/pages/NaturePage.jsx";
import { PortraitPage } from "@/features/herogallery/pages/PortraitPage.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter basename="/web-project-portfolio-2025-react">
      <ScrollToTop />
      <Navbar />
      <WeatherBadge />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/night" element={<MilkyWayPage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/portrait" element={<PortraitPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
