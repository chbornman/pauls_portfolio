"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link"; 

// Lorem Ipsum lyrics
const lyrics = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
  "Nam libero tempore, cum soluta nobis est eligendi optio.",
  "Cumque nihil impedit quo minus id quod maxime placeat facere.",
  "Omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis.",
  "",
  "At vero eos et accusamus et iusto odio dignissimos.",
  "Ducimus qui blanditiis praesentium voluptatum deleniti.",
  "Atque corrupti quos dolores et quas molestias excepturi.",
  "Sint occaecati cupiditate non provident, similique sunt in culpa.",
  "",
  "Itaque earum rerum hic tenetur a sapiente delectus.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur.",
  "Aut perferendis doloribus asperiores repellat.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
  "",
  "Duis aute irure dolor in reprehenderit in voluptate.",
  "Velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident.",
  "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "",
  "Nam libero tempore, cum soluta nobis est eligendi optio.",
  "Cumque nihil impedit quo minus id quod maxime placeat facere.",
  "Omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis.",
  "",
  "At vero eos et accusamus et iusto odio dignissimos.",
  "Itaque earum rerum hic tenetur a sapiente delectus.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur.",
  "Aut perferendis doloribus asperiores repellat.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
  "",
  "Duis aute irure dolor in reprehenderit in voluptate.",
  "Velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident.",
  "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "",
  "Nam libero tempore, cum soluta nobis est eligendi optio.",
  "Cumque nihil impedit quo minus id quod maxime placeat facere.",
  "Omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis.",
  "",
  "At vero eos et accusamus et iusto odio dignissimos.",
  "Ducimus qui blanditiis praesentium voluptatum deleniti.",
  "Atque corrupti quos dolores et quas molestias excepturi.",
  "Sint occaecati cupiditate non provident, similique sunt in culpa.",
  "",
  "Itaque earum rerum hic tenetur a sapiente delectus.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur.",
  "Aut perferendis doloribus asperiores repellat.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
  "",
  "Duis aute irure dolor in reprehenderit in voluptate.",
  "Velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident.",
  "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "",
  "Nam libero tempore, cum soluta nobis est eligendi optio.",
  "Cumque nihil impedit quo minus id quod maxime placeat facere.",
  "Omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis.",
  "",
  "At vero eos et accusamus et iusto odio dignissimos.",
  "Ducimus qui blanditiis praesentium voluptatum deleniti.",
  "Atque corrupti quos dolores et quas molestias excepturi.",
  "Sint occaecati cupiditate non provident, similique sunt in culpa.",
  "",
  "Itaque earum rerum hic tenetur a sapiente delectus.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur.",
  "Aut perferendis doloribus asperiores repellat.",
  "Et harum quidem rerum facilis est et expedita distinctio."
];

export default function Tile1Page() {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [songVolume, setSongVolume] = useState(0.7);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  
  // Audio refs
  const songRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);
  
  // Lyrics scrolling refs
  const lyricsContentRef = useRef<HTMLDivElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  
  // Audio sources
  const songSrc = "/assets/audio/song.mp3";
  const ambientSrc = "/assets/audio/ambient.mp3";
  
  // Animation state
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Fixed scroll speed (pixels per second)
  const scrollSpeed = 15;
  
  // Handle audio loading and errors
  useEffect(() => {
    const songElement = songRef.current;
    const ambientElement = ambientRef.current;
    
    // Set volume levels
    if (songElement) {
      songElement.volume = songVolume;
    }
    
    if (ambientElement) {
      ambientElement.volume = ambientVolume;
    }
    
    // Event listeners for song
    if (songElement) {
      const oncanplay = () => {
        console.log("Song can play");
      };
      
      // Also listen for the loadedmetadata event which might fire earlier
      const onloadedmetadata = () => {
        console.log("Song metadata loaded");
      };
      
      const onerror = (e: Event) => {
        console.error("Error loading song:", e);
      };
      
      songElement.addEventListener('canplay', oncanplay);
      songElement.addEventListener('loadedmetadata', onloadedmetadata);
      songElement.addEventListener('error', onerror);
      
      return () => {
        songElement.removeEventListener('canplay', oncanplay);
        songElement.removeEventListener('loadedmetadata', onloadedmetadata);
        songElement.removeEventListener('error', onerror);
      };
    }
  }, [songVolume, ambientVolume]);
  
  // Update volume when sliders change
  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = songVolume;
    }
    
    if (ambientRef.current) {
      ambientRef.current.volume = ambientVolume;
    }
  }, [songVolume, ambientVolume]);
  
  // Handle lyrics scrolling
  useEffect(() => {
    if (isPlaying) {
      // Start scrolling with fixed speed when playing
      const interval = setInterval(() => {
        if (lyricsContentRef.current && lyricsContainerRef.current) {
          const currentPosition = lyricsContentRef.current.style.transform;
          const translateY = currentPosition ? 
            parseInt(currentPosition.replace('translateY(', '').replace('px)', '')) : 0;
          
          // Calculate new position
          const newPosition = translateY - scrollSpeed / 10;
          
          // Apply new position
          lyricsContentRef.current.style.transform = `translateY(${newPosition}px)`;
          
          // Reset if we've scrolled all the way through
          const contentHeight = lyricsContentRef.current.offsetHeight;
          const containerHeight = lyricsContainerRef.current.offsetHeight;
          
          if (Math.abs(newPosition) > contentHeight - containerHeight + 100) {
            lyricsContentRef.current.style.transform = 'translateY(0)';
          }
        }
      }, 100);
      
      setScrollInterval(interval);
      
      return () => {
        clearInterval(interval);
      };
    } else {
      // Stop scrolling when paused
      if (scrollInterval) {
        clearInterval(scrollInterval);
        setScrollInterval(null);
      }
    }
  }, [isPlaying]); // Remove scrollInterval from dependencies

  /*
  // Original complex scroll speed calculation - commented out for later
  useEffect(() => {
    if (isPlaying) {
      // Calculate scroll speed based on content length and song duration
      const calculateScrollSpeed = () => {
        if (lyricsContentRef.current && lyricsContainerRef.current && songRef.current) {
          const contentHeight = lyricsContentRef.current.offsetHeight;
          const containerHeight = lyricsContainerRef.current.offsetHeight;
          const songDuration = songRef.current.duration || 180; // Default to 3 minutes if duration not available
          
          // Total distance to scroll
          const scrollDistance = contentHeight - containerHeight + 100; // Extra padding
          
          // Pixels per second to complete in song duration
          return scrollDistance / songDuration;
        }
        return 15; // Default speed
      };
      
      const scrollSpeed = calculateScrollSpeed();
      
      const interval = setInterval(() => {
        if (lyricsContentRef.current && lyricsContainerRef.current) {
          const currentPosition = lyricsContentRef.current.style.transform;
          const translateY = currentPosition ? 
            parseInt(currentPosition.replace('translateY(', '').replace('px)', '')) : 0;
          
          // Calculate new position
          const newPosition = translateY - scrollSpeed / 10;
          
          // Apply new position
          lyricsContentRef.current.style.transform = `translateY(${newPosition}px)`;
          
          // Reset if we've scrolled all the way through
          const contentHeight = lyricsContentRef.current.offsetHeight;
          const containerHeight = lyricsContainerRef.current.offsetHeight;
          
          if (Math.abs(newPosition) > contentHeight - containerHeight + 100) {
            lyricsContentRef.current.style.transform = 'translateY(0)';
          }
        }
      }, 100);
      
      setScrollInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      // Stop scrolling when paused
      if (scrollInterval) {
        clearInterval(scrollInterval);
        setScrollInterval(null);
      }
    }
  }, [isPlaying]);
  */

  // Handle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      // Pause both audio elements
      songRef.current?.pause();
      ambientRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play both audio elements
      const songPromise = songRef.current?.play();
      const ambientPromise = ambientRef.current?.play();
      
      // Handle autoplay restrictions
      if (songPromise) {
        songPromise.catch(e => {
          console.error("Error playing song:", e);
        });
      }
      
      if (ambientPromise) {
        ambientPromise.catch(e => {
          console.error("Error playing ambient:", e);
        });
      }
      
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-2 sm:px-8 py-4">
      {/* Background Image */}
      <Image
        src="/assets/nature1.jpg"
        alt="Chickies Rock Background"
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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-6xl mx-auto mt-10 sm:mt-0">
        {/* Controls Panel */}
        <div className="w-auto max-w-xs lg:max-w-sm backdrop-blur-xl bg-white/10 p-3 sm:p-5 rounded-2xl shadow-2xl border border-white/20 mb-4 sm:mb-0">
          <h1 className="text-lg sm:text-2xl font-extrabold mb-3 tracking-tight text-center text-white drop-shadow-lg">
            Chickies Rock
          </h1>
          
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            {/* Play Button */}
            <button
              onClick={togglePlayback}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
              )}
            </button>
            
            {/* Volume Controls Container */}
            <div className="flex gap-3 sm:gap-4">
              {/* Song Volume Control - Vertical */}
              <div className="flex flex-col items-center">
                <label className="block text-white text-xs font-medium mb-1 text-center">Song</label>
                <div className="h-16 sm:h-20 flex items-center justify-center relative mb-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={songVolume}
                    onChange={(e) => setSongVolume(parseFloat(e.target.value))}
                    className="h-full appearance-none bg-white/30 rounded-lg cursor-pointer w-1.5 sm:w-2"
                    style={{ 
                      WebkitAppearance: 'slider-vertical',
                      writingMode: 'vertical-lr',
                      transform: 'rotate(180deg)'
                    }}
                  />
                </div>
                <span className="text-[10px] text-white/70">{Math.round(songVolume * 100)}%</span>
              </div>
              
              {/* Ambient Volume Control - Vertical */}
              <div className="flex flex-col items-center">
                <label className="block text-white text-xs font-medium mb-1 text-center">Ambient</label>
                <div className="h-16 sm:h-20 flex items-center justify-center relative mb-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={ambientVolume}
                    onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                    className="h-full appearance-none bg-white/30 rounded-lg cursor-pointer w-1.5 sm:w-2"
                    style={{ 
                      WebkitAppearance: 'slider-vertical',
                      writingMode: 'vertical-lr',
                      transform: 'rotate(180deg)'
                    }}
                  />
                </div>
                <span className="text-[10px] text-white/70">{Math.round(ambientVolume * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
        {/* Lyrics Panel */}
        <div className="w-auto max-w-xs lg:max-w-sm flex flex-col items-center justify-center">
          <div
            className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-3 sm:p-5 w-full lyrics-glassy-container overflow-hidden relative"
            ref={lyricsContainerRef}
            style={{ height: '16rem', overflow: 'hidden', position: 'relative', display: 'flex' }}
          >
            <div
              className="text-white text-lg sm:text-2xl font-semibold leading-snug drop-shadow-lg lyrics-glassy-text"
              id="lyrics-content"
              ref={lyricsContentRef}
              style={{ willChange: 'transform' }}
            >
              {lyrics.map((line, idx) => (
                line === '' ? <br key={idx} /> : (idx === 0 ? line : ' ' + line)
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Audio Elements */}
      <audio
        ref={songRef}
        src={songSrc}
        loop
        preload="auto"
      />
      <audio
        ref={ambientRef}
        src={ambientSrc}
        loop
        preload="auto"
      />
      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .lyrics-glassy-container::-webkit-scrollbar {
          display: none;
        }
        .lyrics-glassy-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .lyrics-glassy-text {
          text-shadow: 0 2px 16px rgba(0,0,0,0.6), 0 1px 0 #fff;
        }
      `}</style>
    </div>
  );
}
