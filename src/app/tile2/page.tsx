"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

const galleryImages = [
  "/assets/cover1.jpg",
  "/assets/cover2.jpg",
  "/assets/cover3.jpg",
  "/assets/cover4.jpg",
  "/assets/cover5.jpg",
  "/assets/cover6.jpg",
];

export default function Tile2Page() {
  const [currentImage, setCurrentImage] = useState(0);
  const songRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const togglePlayback = () => {
    if (isPlaying) {
      songRef.current?.pause();
      setIsPlaying(false);
    } else {
      songRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-2 sm:px-8 py-4">
      {/* Background Image */}
      <Image
        src="/assets/nature2.jpg"
        alt="Safe Harbor Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 backdrop-blur-lg bg-white/10 p-2 sm:p-3 rounded-full shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        aria-label="Back to home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
      </Link>
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 w-full max-w-6xl mx-auto mt-10 sm:mt-0">
        {/* Image Gallery */}
        <div className="w-full lg:w-3/5 backdrop-blur-xl bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20 mb-4 sm:mb-0">
          <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-4">
            <Image
              src={galleryImages[currentImage]}
              alt={`Gallery image ${currentImage + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>
          <div className="flex justify-center mt-4 gap-2 sm:gap-4">
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition backdrop-blur-sm text-sm sm:text-base"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ◀ Previous
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition backdrop-blur-sm text-sm sm:text-base"
              onClick={handleNext}
              aria-label="Next image"
            >
              Next ▶
            </button>
          </div>
        </div>

        {/* Audio Section */}
        <div className="w-full lg:w-2/5 backdrop-blur-xl bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Safe Harbor (Instrumental)</h2>
          <div className="flex justify-center mb-4">
            <button 
              onClick={togglePlayback}
              className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Audio Element */}
      <audio
        ref={songRef}
        src="/assets/audio/song.mp3"
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </div>
  );
}
