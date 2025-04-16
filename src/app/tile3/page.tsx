"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// Array of random thoughts about the song
const songThoughts = [
  "The melody reminds me of waves crashing against the shore...",
  "I wonder what inspired the composer to create this piece?",
  "There's something nostalgic about this rhythm...",
  "The harmony feels like watching a sunset over calm waters.",
  "This part always makes me think of a journey beginning.",
  "If this song were a color, it would be deep blue with hints of gold.",
  "The tempo changes here like shifting tides.",
  "I can almost picture a story unfolding with each note.",
  "This reminds me of that time by the harbor, watching boats pass by.",
  "The subtle background elements create such depth in this piece.",
  "Music has a way of transporting you to different places and times.",
  "I love how the melody builds and then resolves so beautifully.",
  "Sometimes I hear new details in this song every time I listen.",
  "There's an emotional quality that's hard to put into words.",
  "The rhythm here feels like gentle raindrops on a quiet afternoon.",
];

export default function Tile3Page() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const songRef = useRef<HTMLAudioElement>(null);

  // Toggle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      songRef.current?.pause();
      setIsPlaying(false);
    } else {
      songRef.current?.play();
      setIsPlaying(true);
    }
  };

  // Change thoughts every few seconds when the song is playing
  useEffect(() => {
    let thoughtInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      thoughtInterval = setInterval(() => {
        setCurrentThoughtIndex((prevIndex) => {
          // Get a random index that's different from the current one
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * songThoughts.length);
          } while (newIndex === prevIndex && songThoughts.length > 1);
          
          return newIndex;
        });
      }, 5000); // Change thought every 5 seconds
    }
    
    return () => {
      if (thoughtInterval) clearInterval(thoughtInterval);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-2 sm:px-8 py-4">
      {/* Background Image */}
      <Image
        src="/assets/nature3.jpg"
        alt="Musical Thoughts Background"
        fill
        className="object-cover"
        priority
      />
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
      <div className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-3xl mx-auto mt-10 sm:mt-0">
        {/* Thoughts Display */}
        <div className="w-full backdrop-blur-xl bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20 min-h-[120px] sm:min-h-[200px] flex items-center justify-center">
          <p className="text-white text-lg sm:text-2xl text-center font-medium leading-relaxed transition-opacity duration-500">
            {isPlaying ? (
              songThoughts[currentThoughtIndex]
            ) : (
              "Press play to start the music and see thoughts about the song..."
            )}
          </p>
        </div>
        {/* Audio Section */}
        <div className="w-full backdrop-blur-xl bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
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
