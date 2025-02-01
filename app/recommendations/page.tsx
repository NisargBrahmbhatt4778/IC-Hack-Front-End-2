"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Play } from "lucide-react"
import '../globals.css';

export default function RecommendationPage() {
  const [videos, setVideos] = useState(generateVideos())
  const router = useRouter()

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setVideos(generateVideos())
  }

  function handleVideoClick(title: string) {
    router.push(`/?video=${encodeURIComponent(title)}`)
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-start items-center text-white relative overflow-hidden">
      {/* Floating Symbols Background */}
      <div className="absolute inset-0 pointer-events-none">
        {['∫', 'Σ', 'ℏ', '⊗', '∇', 'sin(x)', 'E=mc²', 'π', 'λ', '𝛿', '⊕'].map((symbol, index) => (
          <span key={index} className="floating-symbol">{symbol}</span>
        ))}
      </div>

      {/* Header */}
      <header className="w-full bg-gray-800 py-4 shadow-lg text-center z-10">
        <h1 className="text-4xl font-extrabold font-serif text-blue-400 tracking-wide">
          Instructly
        </h1>
      </header>

      {/* Search Bar */}
      <div className="mb-12 flex justify-center w-full z-10 pt-12">
        <form onSubmit={handleSearch} className="flex gap-4 w-full max-w-4xl">
          <Input type="search" placeholder="Search for videos..." className="flex-grow bg-gray-800 text-white p-6 rounded-2xl text-xl" />
          <Button type="submit" className="bg-blue-500 text-white py-6 px-10 rounded-2xl text-xl">
        <Search className="mr-2 h-8 w-8" /> Search
          </Button>
        </form>
      </div>

      {/* Video Grid */}
      <main className="mb-6 flex justify-center w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden w-80 cursor-pointer transition-transform transform hover:scale-105" 
              onClick={() => handleVideoClick(video.title)}
            >
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <img src={video.thumbnail || "/thumbnail.jpg"} alt={video.title} className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-1 text-blue-400 truncate">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
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
