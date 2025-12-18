import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NaturePage from "./pages/NaturePage.jsx";
import PortraitPage from "./pages/PortraitPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NightPage from "./pages/NightPage.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/portrait" element={<PortraitPage />} />
        <Route path="/night" element={<NightPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
