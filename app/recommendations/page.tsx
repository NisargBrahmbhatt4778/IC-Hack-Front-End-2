"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Play } from "lucide-react"

export default function YouTubeInterface() {
  const [videos, setVideos] = useState(generateVideos())
  const router = useRouter()

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setVideos(generateVideos())
  }

  function handleGenerateVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert("New video generated!")
  }

  function handleVideoClick(title: string) {
    router.push(`/?video=${encodeURIComponent(title)}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 lg:p-12 flex flex-col items-center">
      <header className="mb-6 flex justify-center w-full">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
          <Input type="search" placeholder="Search for videos..." className="flex-grow" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </header>

      <main className="mb-6 flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow overflow-hidden w-80 cursor-pointer" 
              onClick={() => handleVideoClick(video.title)}
            >
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <img src={video.thumbnail || "/thumbnail.jpg"} alt={video.title} className="absolute top-0 left-0 w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex justify-center w-full">
        <form onSubmit={handleGenerateVideo} className="flex justify-center w-full max-w-lg">
          <Button type="submit" className="w-full text-lg py-3">
            Generate New Video
          </Button>
        </form>
      </footer>
    </div>
  )
}

function generateVideos() {
  return Array.from({ length: 12 }, (_, i) => ({
    title: `Video ${i + 1}`,
    channel: `Channel ${i + 1}`,
    thumbnail: `/thumbnail.jpg`,
  }))
}
