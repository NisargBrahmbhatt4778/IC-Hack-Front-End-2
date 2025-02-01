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
    let index = 0;
    const textToDisplay = textsToDisplay[currentTextIndex];

    const typingInterval = setInterval(() => {
      if (index < textToDisplay.length) {
        setPlaceholderText(textToDisplay.slice(0, index + 1));
        index += 1;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setPlaceholderText('');
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textsToDisplay.length);
        }, 3000);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      setPlaceholderText('');
    };
  }, [currentTextIndex]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-start items-center text-white relative overflow-hidden">
      {/* Floating Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        {['∫', 'Σ', 'ℏ', '⊗', '∇', 'sin(x)', 'E=mc²', 'π', 'λ', '𝛿', '⊕'].map((symbol, index) => (
          <span key={index} className="floating-symbol">{symbol}</span>
        ))}
      </div>

      {/* Header */}
      <header className="w-full bg-gray-800 py-4 shadow-lg text-center z-10">
        <h1 className="text-4xl font-extrabold font-serif text-blue-400 tracking-wide">
          Instructly
        </h1>
      </header>

      {/* Centered Content */}
      <div className="flex-grow flex flex-col justify-center items-center z-10">
        {/* Larger Input Box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={isFocused ? '' : placeholderText}
            className="bg-gray-800 text-white p-6 rounded-xl w-[30rem] h-20 text-center text-xl"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
