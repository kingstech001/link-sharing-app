// src/app/page.tsx
import React from "react";
import Link from "next/link";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <main>
      <LoginPage />
    </main>
  );
}
