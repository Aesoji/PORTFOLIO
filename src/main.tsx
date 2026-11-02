import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import "./assets/font/typography.css";


function enableTouchActiveStates(): void {
    document.addEventListener("touchstart", () => undefined, { passive: true });
}

enableTouchActiveStates();

ReactDOM.createRoot(document.getElementById("root")!, {
  onUncaughtError(error, errorInfo) {
    console.error("REAL ERROR:", error);
    console.error(errorInfo.componentStack);
  },
}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
