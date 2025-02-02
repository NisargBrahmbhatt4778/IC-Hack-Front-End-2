import { Sandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

const fetchSandpackCode = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  return `import React, { useState, useEffect } from 'react';

const EigenvectorVisualization = () => {
  const [angle, setAngle] = useState(45);
  const [scale, setScale] = useState(2);
  const [gridSize] = useState(10);
  const [vectors, setVectors] = useState([]);
  
  // Calculate transformation matrix and eigenvectors
  useEffect(() => {
    const radians = (angle * Math.PI) / 180;
    // Create transformation matrix
    const a = scale * Math.cos(radians);
    const b = -Math.sin(radians);
    const c = Math.sin(radians);
    const d = scale * Math.cos(radians);
    
    // Calculate eigenvalues and eigenvectors
    const trace = a + d;
    const det = a * d - b * c;
    const discriminant = Math.sqrt(trace * trace - 4 * det);
    
    const eigenvalue1 = (trace + discriminant) / 2;
    const eigenvalue2 = (trace - discriminant) / 2;
    
    // Calculate eigenvectors
    const eigenvector1 = normalizeVector([eigenvalue1 - d, c]);
    const eigenvector2 = normalizeVector([eigenvalue2 - d, c]);
    
    // Generate grid points and their transformations
    const newVectors = [];
    for (let x = -gridSize; x <= gridSize; x += 1) {
      for (let y = -gridSize; y <= gridSize; y += 1) {
        const input = [x, y];
        const output = [
          a * x + b * y,
          c * x + d * y
        ];
        newVectors.push({ input, output });
      }
    }
    
    // Add eigenvectors to visualization
    newVectors.push({
      input: scaleVector(eigenvector1, gridSize),
      output: scaleVector(eigenvector1, gridSize * eigenvalue1),
      isEigenvector: true,
      eigenvalue: eigenvalue1
    });
    
    newVectors.push({
      input: scaleVector(eigenvector2, gridSize),
      output: scaleVector(eigenvector2, gridSize * eigenvalue2),
      isEigenvector: true,
      eigenvalue: eigenvalue2
    });
    
    setVectors(newVectors);
  }, [angle, scale, gridSize]);
  
  // Helper functions
  const normalizeVector = ([x, y]) => {
    const length = Math.sqrt(x * x + y * y);
    return [x / length, y / length];
  };
  
  const scaleVector = ([x, y], scalar) => {
    return [x * scalar, y * scalar];
  };
  
  // Convert coordinate space to SVG space
  const toSVGCoords = ([x, y]) => {
    const svgSize = 400;
    const scale = svgSize / (2 * gridSize + 2);
    return [
      x * scale + svgSize / 2,
      -y * scale + svgSize / 2
    ];
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  };

  const cardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  };

  const contentStyle = {
    padding: '20px',
  };

  const controlStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  };

  const sliderStyle = {
    width: '100%',
    marginBottom: '16px',
  };
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Interactive Eigenvector Visualization</h2>
        </div>
        <div style={contentStyle}>
          <div style={controlStyle}>
            <label style={labelStyle}>Rotation Angle: {angle}°</label>
            <input 
              type="range"
              style={sliderStyle}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              min={0}
              max={360}
              step={1}
            />
          </div>
          
          <div style={controlStyle}>
            <label style={labelStyle}>Scale Factor: {scale.toFixed(1)}</label>
            <input
              type="range"
              style={sliderStyle}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              min={0.1}
              max={3}
              step={0.1}
            />
          </div>
          
          <svg 
            width="400" 
            height="400" 
            style={{
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
            }}
            viewBox="0 0 400 400"
          >
            {/* Draw coordinate axes */}
            <line 
              x1="0" 
              y1="200" 
              x2="400" 
              y2="200" 
              stroke="gray" 
              strokeWidth="1"
            />
            <line 
              x1="200" 
              y1="0" 
              x2="200" 
              y2="400" 
              stroke="gray" 
              strokeWidth="1"
            />
            
            {/* Draw vectors */}
            {vectors.map((vector, i) => {
              const [x1, y1] = toSVGCoords(vector.input);
              const [x2, y2] = toSVGCoords(vector.output);
              
              if (vector.isEigenvector) {
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={vector.eigenvalue > 0 ? "#3b82f6" : "#ef4444"}
                      strokeWidth="2"
                    />
                    <circle
                      cx={x2}
                      cy={y2}
                      r="3"
                      fill={vector.eigenvalue > 0 ? "#3b82f6" : "#ef4444"}
                    />
                  </g>
                );
              }
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="gray"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EigenvectorVisualization;`;
};

export default function InteractivePane() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    fetchSandpackCode().then(setCode);
  }, []);

  useEffect(() => {
    const hideEditor = () => {
      const wrapper = document.querySelector('.sp-wrapper > div:first-child');
      if (wrapper) {
        const editor = wrapper.firstElementChild as HTMLElement;
        if (editor) {
          editor.style.display = 'none';
        }
      }
    };    

    const observer = new MutationObserver(hideEditor);
    observer.observe(document.body, { childList: true, subtree: true });
    hideEditor();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full h-full max-w-3xl mt-8 bg-white rounded-lg overflow-hidden">
        {code && (
          <Sandpack
            template="react"
            files={{ "/App.js": code }}
            options={{
              editorHeight: "100vh",
              showLineNumbers: true,
              showInlineErrors: true,
              showNavigator: false,
              showTabs: false,
              layout: "preview",
            }}
          />
        )}
      </div>
    </div>
  );
}
