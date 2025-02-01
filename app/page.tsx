"use client"

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import VideoPane from "./components/VideoPane"
import InteractivePane from "./components/InteractivePane"
import { useState } from "react"
import { LoadingText } from "@/components/loading_text"

export default function Home() {
  const isLoading = useState<boolean>(true)
  if (isLoading) {
    return <LoadingText />
  }

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={30}>
        <VideoPane />
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
      <Panel minSize={30}>
        <InteractivePane />
      </Panel>
    </PanelGroup>
  )
}

