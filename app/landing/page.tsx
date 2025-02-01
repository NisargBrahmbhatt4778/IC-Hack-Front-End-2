'use client'; // Mark this as a Client Component

import { useState, useEffect, useRef } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

  // Function to dynamically resize textarea height
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to content height
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustHeight(); // Resize dynamically
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '80px'; // Reset to default size when clicked
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-start items-center text-white relative overflow-hidden">
      {/* Floating Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        {['∫', 'Σ', 'ℏ', '⊗', '∇', 'sin(x)', 'E=mc²', 'π', 'λ', '𝛿', '⊕', 'cos(x)'].map((symbol, index) => (
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
        {/* Dynamically Resizing Textarea */}
        <div className="relative mb-6">
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleChange}
            placeholder={isFocused ? '' : placeholderText}
            className="bg-gray-800 text-white p-6 rounded-xl text-center text-xl resize-none transition-all duration-200 w-[30rem] overflow-hidden"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ minHeight: '80px', maxHeight: '300px' }} // Improved default size
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
