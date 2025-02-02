import React from 'react';

interface VideoPaneProps {
  videoUrl: string;
}

const VideoPane: React.FC<VideoPaneProps> = ({ videoUrl }) => {
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-5xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <video width="100%" height="auto" controls className="absolute top-0 left-0 w-full h-full rounded-lg">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPane;