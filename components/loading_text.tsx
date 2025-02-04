import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { text } from "stream/consumers";

export const LoadingText = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textDir, setTextDir] = useState(1);

  const wait = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        setTextDir((prevDir) => {
          setCurrentIndex((prevIndex) => prevIndex - prevDir);
          return prevDir * -1;
        });
        return resolve(undefined);
      }, 1000)
    );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === currentText.length + 1 || currentIndex === -1) {
        wait();
      } else {
        console.log(currentText.slice(0, currentIndex));
        setCurrentText(currentText.slice(0, currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + textDir);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return <span>{currentText}</span>;
};
