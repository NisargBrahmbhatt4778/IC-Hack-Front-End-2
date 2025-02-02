"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import VideoPane from "../components/VideoPane";
import InteractivePane from "../components/InteractivePane";
import { useEffect, useState } from "react";
import { LoadingText } from "@/components/loading_text";
import { useSearchParams } from "next/navigation";

export const API_URL = "http://localhost:8000"; // Use localhost for testing

interface Video {
  id: string;
  video_title: string;
  image_url: string;
  video_url: string;
  react_code: string;
  created_at: number;
  image_path: string;
  video_path: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  useEffect(() => {
    if (taskId) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`${API_URL}/videos?video_id=${taskId}`, {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("made reuest for video");
          console.log(data.video_url);
          console.log(data.react_code);
          if (data.video_url) {
            setVideoUrl(data.video_url);
            setVideo(data);
            setIsLoading(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [taskId]);

  if (isLoading) {
    return <LoadingText />;
  }

  return (
    <PanelGroup
      direction="horizontal"
      className="h-screen w-screen overflow-hidden flex-1"
    >
      <Panel defaultSize={50} minSize={30} className="bg-orange-100">
        <VideoPane videoUrl={videoUrl ?? ""} videoDetails={video} />
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
      <Panel minSize={30}>
        <InteractivePane reactCode={video?.react_code} />
      </Panel>
    </PanelGroup>
  );
}
