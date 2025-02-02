"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/utils";

interface PollingContextType {
  startPolling: (taskId: string) => void;
  showLoading: React.ReactElement | undefined;
}

const PollingContext = createContext<PollingContextType | undefined>(undefined);

export function PollingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState<
    React.ReactElement | undefined
  >(undefined);

  const startPolling = async (taskId: string) => {
    setShowLoading(
      <>
        <LoaderCircle className="animate-spin" />
        <span className="animate-pulse">Generating Video...</span>
      </>
    );

    const intID = setInterval(async () => {
      const res = await fetch(`${API_URL}/video_status?task_id=${taskId}`);
      const data = await res.json();

      if (data.status === "SUCCESS") {
        setShowLoading(
          <>
            <Button
              onClick={() => router.push(`/video?id=${data?.result?.id}`)}
              className="bg-[#E37C4C] hover:bg-[#d16b3d]"
            >
              View Your Video
            </Button>
          </>
        );
        setTimeout(() => setShowLoading(undefined), 5000);
        clearInterval(intID);
      } else if (data.status === "FAILURE") {
        setShowLoading(
          <>
            <span className="text-red-500">
              Failed to generate video. Please try again.
            </span>
          </>
        );
        setTimeout(() => setShowLoading(undefined), 5000);
        clearInterval(intID);
      }
    }, 5000);
  };

  return (
    <PollingContext.Provider value={{ startPolling, showLoading }}>
      {children}
      {showLoading !== undefined && (
        <div className="fixed left-10 top-10 shadow-md p-4 bg-white rounded-lg border-[1px] flex flex-row gap-5 z-50">
          {showLoading}
        </div>
      )}
    </PollingContext.Provider>
  );
}

export function usePolling() {
  const context = useContext(PollingContext);
  if (context === undefined) {
    throw new Error("usePolling must be used within a PollingProvider");
  }
  return context;
}
