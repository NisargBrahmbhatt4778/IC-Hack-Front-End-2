"use client"; // Ensure this is the first line

import React, { useEffect, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

// Mock Backend Function - Simulates fetching JSX code from a backend
const fetchJSXFromBackend = async (): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(`
        () => (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ color: "blue" }}>Hello from Backend JSX!</h2>
            <button 
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => alert("Dynamic Button Clicked!")}>
              Click Me
            </button>
          </div>
        )
      `);
    }, 1000) // Simulated API delay
  );
};

const DynamicRenderer: React.FC = () => {
  const [backendJSX, setBackendJSX] = useState<string | null>(null);

  useEffect(() => {
    fetchJSXFromBackend().then(setBackendJSX);
  }, []);

  if (!backendJSX) {
    return <p>Loading dynamic content...</p>;
  }

  return (
    <LiveProvider code={backendJSX} scope={{ React }}>
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "500px", margin: "auto" }}>
        <h3>Live JSX Editor</h3>
        <LiveEditor style={{ fontSize: "14px", backgroundColor: "#f5f5f5" }} />
        <LiveError style={{ color: "red", fontWeight: "bold" }} />
        <h3>Rendered Output</h3>
        <LivePreview style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", backgroundColor: "#fafafa" }} />
      </div>
    </LiveProvider>
  );
};

export default DynamicRenderer;
