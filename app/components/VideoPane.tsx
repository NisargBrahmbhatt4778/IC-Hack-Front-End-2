export default function VideoPane() {
  return (
    <div className="h-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Video Content</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}

