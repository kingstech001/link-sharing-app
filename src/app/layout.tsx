"use client";
import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use client-side rendering to get the current path
  const pathname = usePathname();

  // Determine if Navbar should be hidden
  const showNavbar = !["/", "/login", "/register", "/profile-preview"].includes(
    pathname
  );

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <Head>
          <title>Link Sharing App</title>
          <meta
            name="description"
            content="A full-stack link-sharing application"
          />
        </Head>
        {/* Conditionally render the Navbar */}
        {showNavbar && <Navbar />}
        <main className="flex-1 w-full h-full">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
