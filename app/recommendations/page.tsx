"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { API_URL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { usePolling } from "../contexts/PollingContext";

const Bubble = ({
  size,
  position,
  duration,
}: {
  size: number;
  position: { top: string; left: string };
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-[#E37C4C] opacity-10"
    style={{
      width: size,
      height: size,
      top: position.top,
      left: position.left,
    }}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
);

export default function VideoGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const params = useSearchParams();
  const { startPolling } = usePolling();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    if (!query) return;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8000/vector/search?query=${encodeURIComponent(
            query
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  const handleSearch = () => {
    if (!searchQuery) return;
    router.push(`/recommendations?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleVideoGen = async () => {
    const q = params.get("query");
    if (q) {
      const res = await fetch(`${API_URL}/gen_video`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: q,
        }),
      });

      const data = await res.json();
      if ("task_id" in data) {
        startPolling(data.task_id);
      } else {
        console.error("Failed to generate video");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Bubbles */}
      <Bubble size={100} position={{ top: "10%", left: "5%" }} duration={7} />
      <Bubble size={60} position={{ top: "30%", left: "15%" }} duration={5} />
      <Bubble size={80} position={{ top: "50%", left: "8%" }} duration={6} />
      <Bubble size={120} position={{ top: "70%", left: "12%" }} duration={8} />
      <Bubble size={90} position={{ top: "20%", left: "85%" }} duration={7} />
      <Bubble size={70} position={{ top: "40%", left: "90%" }} duration={6} />
      <Bubble size={110} position={{ top: "60%", left: "80%" }} duration={8} />
      <Bubble size={50} position={{ top: "80%", left: "88%" }} duration={5} />

      {/* Header */}
      <motion.header
        className="py-6 text-center relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#E37C4C] to-[#E37C4C]">
          VisuMath
        </h1>
      </motion.header>

      {/* Search Section */}
      <motion.div
        className="max-w-4xl mx-auto px-4 py-8 relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-3 justify-center">
          <Input
            type="search"
            placeholder="Search videos..."
            className="max-w-3xl text-lg py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button
            className="bg-[#E37C4C] hover:bg-[#d16b3d] transition-all duration-300 hover:scale-105 text-lg py-6 px-8"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Community Video Gallery
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {videos.map((video, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              variants={item}
              whileHover={{ y: -5 }}
              onClick={() => {
                router.push(`/video?id=${video.id}`);
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.image_url}
                  alt={video.video_title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{video.video_title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Generate Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={handleVideoGen}
            className="bg-[#E37C4C] hover:bg-[#d16b3d] transition-all duration-300 hover:scale-105 text-lg py-6 px-8"
          >
            Generate New Video
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
