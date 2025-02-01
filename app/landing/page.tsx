'use client'; // Add this line to mark this as a Client Component

import { useState, useEffect } from 'react';
import '../globals.css'

const LandingPage = () => {
  const [displayText, setDisplayText] = useState('');
  const textToDisplay = "Tell me about eigenvalues";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + textToDisplay[index]);
      index += 1;
      if (index === textToDisplay.length) {
        clearInterval(interval);
        setTimeout(() => setDisplayText(''), 1000); // Clear after 1 second
      }
    }, 100); // Set letter-by-letter delay

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white">
      {/* Header */}
      <h1 className="text-5xl font-semibold mb-10">Instructly</h1>

      {/* Centered Text Box */}
      <div className="relative">
        <input
          type="text"
          value={displayText}
          className="bg-gray-800 text-white p-4 rounded-xl w-96 text-center"
          readOnly
        />
      </div>
    </div>
  );
}

export default LandingPage;
