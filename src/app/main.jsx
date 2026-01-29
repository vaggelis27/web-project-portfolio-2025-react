import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "@/app/App.jsx";


import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);

