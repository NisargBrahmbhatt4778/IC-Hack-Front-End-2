"use client"

import { useState, useEffect, useRef } from 'react';
import '../globals.css';
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const textsToDisplay = [
    "Formation of a sine wave.",
    "Fluid flow using Bernoulli's principle.",
    "Eigenvalues transforming vectors.",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

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

    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
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

  const handleSearch = () => {
    console.log("Searching for:", inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents new lines in textarea
      handleSearch();
    }
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
      <header className="w-full bg-gray-800 py-8 shadow-lg text-center z-10">
        <h1 className="text-4xl font-extrabold font-serif text-blue-400 tracking-wide">
          Instructly
        </h1>
      </header>

      {/* Centered Content */}
      <div className="flex-grow flex flex-col justify-center items-center z-10">
        {/* Search Input with Button */}
        <div className="relative mb-6 flex items-center space-x-4">
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Detect Enter key
            placeholder={isFocused ? '' : placeholderText}
            className="bg-gray-800 text-white p-6 rounded-xl text-center text-xl resize-none transition-all duration-200 w-[30rem] overflow-hidden border-4 border-white focus:border-blue-400"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ minHeight: '80px', maxHeight: '300px' }} 
          />
          {/* Search Button */}
          <Button 
            type="submit" 
            className="bg-blue-500 text-white py-10 px-10 rounded-2xl text-xl"
            onClick={handleSearch}>
            <Search className="mr-2 h-8 w-8" /> Search
          </Button>
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
}