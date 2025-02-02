"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function VisuMath() {
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState(
    "Enter a mathematical concept..."
  );
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const examples = [
    "Formation of a sine wave",
    "Fluid flow using Bernoulli's principle",
    "Eigenvalues transforming vectors",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText(examples[index]);
      index = (index + 1) % examples.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [examples]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/recommendations?query=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
            VisuMath
          </h1>

          <div className="relative mb-6 flex items-center space-x-4 justify-center">
            <textarea
              ref={textAreaRef}
              value={inputValue}
              onChange={handleChange}
              placeholder={placeholderText}
              className="bg-gray-100 text-black p-6 rounded-xl text-center text-xl resize-none transition-all duration-200 w-[30rem] overflow-hidden border-4 border-gray-300 focus:border-orange-500"
              style={{ minHeight: "80px", maxHeight: "300px" }}
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Search
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
