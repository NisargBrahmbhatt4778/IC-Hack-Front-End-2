import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar"; // Import Navbar

function VideoCard() {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">Play</span>
      </Link>
      <img
        src="/placeholder.svg"
        alt="Video Thumbnail"
        width={300}
        height={200}
        className="object-cover w-full h-48"
        style={{ aspectRatio: "300/200", objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="text-white">
          <Play className="w-6 h-6" />
        </Button>
      </div>
      <div className="bg-white p-3 dark:bg-gray-950">
        <h3 className="font-semibold text-md md:text-lg line-clamp-1">
          Sample Video Title
        </h3>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Learn More About
              <br />
              <span className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg mt-2">@TOPIC HERE</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Scroll Down to view community videos or generate your own
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="flex items-center gap-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                Scroll Down
              </Button>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <Play className="w-5 h-5" />
                Generate My Own
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Delicious meals including meat dishes and salads on wooden surface"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="w-full py-6 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(3)].map((_, index) => (
              <VideoCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
