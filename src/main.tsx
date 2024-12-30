import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/style/index.css";
import "@/style/custom.css";
import MainRoute from "./MainRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainRoute />
  </StrictMode>
);