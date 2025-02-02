import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 text-xl">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        {/* Logo Centered */}
        <a href="/" className="text-orange-600 text-2xl font-bold tracking-tight">
          VisuMath
        </a>
        {/* Button aligned to right
        <a
          href="#get-started"
          className="bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md text-lg absolute right-4"
        >
          Contact
        </a> */}
      </div>
    </nav>
  );
}