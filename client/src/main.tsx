/** Style note: Field Notes for Better Work — the runtime must preserve a calm, dependable reading surface on every published route. */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function mountApp() {
  const root = document.getElementById("root");
  if (!root) {
    document.addEventListener("DOMContentLoaded", mountApp, { once: true });
    return;
  }
  createRoot(root).render(<App />);
}

mountApp();
