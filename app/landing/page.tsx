'use client'; // Mark this as a Client Component

import { useState, useEffect } from 'react';
import '../globals.css';

const LandingPage = () => {
  const textsToDisplay = [
    "Curvature of spacetime near a black hole.",
    "Formation of a sine wave.",
    "Fluid flow using Bernoulli's principle.",
    "Eigenvalues transforming vectors.",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let index = 0; // Initialize index for typing
    const textToDisplay = textsToDisplay[currentTextIndex]; // Get the current text to display

    const typingInterval = setInterval(() => {
      if (index < textToDisplay.length) {
        // Append character by character
        setPlaceholderText(textToDisplay.slice(0, index + 1)); 
        index += 1;
      } else {
        // Once typing completes, wait for a delay and clear
        clearInterval(typingInterval);
        setTimeout(() => {
          setPlaceholderText('');
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textsToDisplay.length); // Move to the next text
        }, 3000);
      }
    }, 100);

    // Clean up interval and reset placeholder on unmount
    return () => {
      clearInterval(typingInterval);
      setPlaceholderText('');
    };
  }, [currentTextIndex]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-start items-center text-white">
      {/* Header */}
      <header className="w-full bg-gray-800 py-4 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold font-serif text-blue-400 tracking-wide">
          Instructly
        </h1>
      </header>

      {/* Centered Content */}
      <div className="flex-grow flex flex-col justify-center items-center">
        {/* Larger Input Box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={isFocused ? '' : placeholderText} // Show placeholder text unless focused
            className="bg-gray-800 text-white p-6 rounded-xl w-[30rem] h-20 text-center text-xl"
            onFocus={() => setIsFocused(true)} // Clear placeholder on focus
            onBlur={() => setIsFocused(false)} // Restore placeholder when focus is lost
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
