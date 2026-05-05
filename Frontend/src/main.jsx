import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";

// PWA Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('PWA Service Worker registered:', registration)
    }).catch(error => {
      console.log('PWA Service Worker registration failed:', error)
    })
  })
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <div className="dark:bg-slate-900 dark:text-white">
        <App />
      </div>
    </AuthProvider>
  </BrowserRouter>
);
