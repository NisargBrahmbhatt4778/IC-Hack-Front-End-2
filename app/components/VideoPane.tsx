export default function VideoPane() {
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-5xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
