import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 text-xl">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Logo Centered */}
        <a href="/" className="text-orange-600 text-3xl font-bold tracking-tight">
          VisuMath
        </a>
      </div>
    </nav>
  );
}