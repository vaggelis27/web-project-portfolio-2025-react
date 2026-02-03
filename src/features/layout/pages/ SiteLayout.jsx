import { Outlet } from "react-router-dom";

import { Navbar } from "@/features/layout/components/Navbar.jsx";
import { Footer } from "@/features/layout/components/Footer.jsx";
import { ScrollToTop } from "@/features/layout/components/ScrollToTop.jsx";
import { WeatherBadge } from "@/features/layout/components/WeatherBadge.jsx";

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <WeatherBadge />

      <Outlet />

      <Footer />
    </>
  );
}
