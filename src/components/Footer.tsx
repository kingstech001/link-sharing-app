import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>© {new Date().getFullYear()} Link Sharing App</p>
    </footer>
  );
};

export default Footer;
