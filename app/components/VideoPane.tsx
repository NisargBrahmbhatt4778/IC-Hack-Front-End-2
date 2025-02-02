import React from 'react';

interface VideoPaneProps {
  videoUrl: string;
}

const VideoPane: React.FC<VideoPaneProps> = ({ videoUrl }) => {
  // Define specific positions for the symbols
  const symbolPositions = [
    { symbol: '∫', top: '15%', left: '5%' },
    { symbol: 'Σ', top: '10%', left: '85%' },
    { symbol: '∞', top: '10%', left: '20%' },
    { symbol: 'Ω', top: '85%', left: '85%' },
    { symbol: 'β', top: '80%', left: '10%' },
    { symbol: 'π', top: '90%', left: '50%' },
  ];

  return (
    <div className="h-screen bg-orange-100 p-6 flex items-center justify-center overflow-y-auto relative">

      {/* Floating Math and Physics Symbols */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="animate-floatingSymbols">
          {symbolPositions.map((position, index) => (
            <div
              key={index}
              className="absolute text-4xl sm:text-5xl md:text-6xl font-bold text-gray-500 opacity-30"
              style={{
                top: position.top,
                left: position.left,
                animationDuration: '6s', // Fixed duration for smooth animation
                animationDelay: `${Math.random() * 3}s`, // Random delay before starting animation
                animationName: 'floating',
                pointerEvents: 'none', // To ensure the floating symbols do not block interaction
              }}
            >
              {position.symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Heading Above the Video */}
      <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600 z-10">
        VisuMath
      </h1>

      {/* Video Element */}
      <div className="w-full max-w-5xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video
            width="100%"
            height="auto"
            controls
            className="absolute top-0 left-0 w-full h-full rounded-lg border-4 border-orange-700 shadow-lg"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* "Start Again?" Button at Bottom Right */}
      <button
        onClick={() => window.location.reload()} // Button will reload the page
        className="absolute bottom-6 right-6 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-700 transition duration-300"
      >
        Start Again?
      </button>
    </div>
  );
};

export default VideoPane;
