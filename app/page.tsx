"use client"

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import VideoPane from "./components/VideoPane"
import InteractivePane from "./components/InteractivePane"
import { useEffect, useState } from "react"
import { LoadingText } from "@/components/loading_text"

export const API_URL = 'http://localhost:8000' // Use localhost for testing

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true)
  const [taskId, setTaskId] = useState<string | undefined>()
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    setTaskId("test1")
  }, [])

  useEffect(() => {
    if (taskId) {
      const interval = setInterval(async () => {
        try {
          console.log('Fetching video...')
          
          const response = await fetch(`${API_URL}/videos?video_id=${taskId}`)
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json(); // ✅ Await the JSON
          console.log('API response - 2:', JSON.stringify(data));

          if (data.video_url) {
            setVideoUrl(data.video_url);
            setIsLoading(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [taskId])

  // if (isLoading) {
  //   return <LoadingText />
  // }

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={30}>
        <VideoPane videoUrl={videoUrl} />
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
      <Panel minSize={30}>
        <InteractivePane />
      </Panel>
    </PanelGroup>
  )
}
