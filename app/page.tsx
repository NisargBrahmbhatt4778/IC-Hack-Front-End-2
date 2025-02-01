"use client"

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import VideoPane from "./components/VideoPane"
import InteractivePane from "./components/InteractivePane"

export default function Home() {
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

