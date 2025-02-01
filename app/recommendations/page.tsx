"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Play } from "lucide-react"

export default function YouTubeInterface() {
  const [videos, setVideos] = useState(generateVideos())

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setVideos(generateVideos())
  }

  function handleGenerateVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert("New video generated!")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex justify-center">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
          <Input type="search" placeholder="Search for videos..." className="flex-grow" />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </header>

      <main className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex justify-center">
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
    thumbnail: `/placeholder.svg?height=160&width=280`,
  }))
}