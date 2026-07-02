"use client";

import Sidebar from "./components/Sidebar/sidebar";
import Main from "./components/Main/main";

export default function Home() {
  return (
    // Force the components to sit side-by-side with full window width
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
      <Sidebar />
      <Main style={{ flex: 1 }} />
    </div>
  );
}