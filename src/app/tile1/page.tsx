"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Howl } from "howler"; // Import Howl

// Lorem Ipsum lyrics (kept the same)
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
];

export default function Tile1Page() {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [songVolume, setSongVolume] = useState(0.7);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const [isAudioReady, setIsAudioReady] = useState(false); // Track if Howler is ready
  const [audioError, setAudioError] = useState<string | null>(null);

  // --- Howler Refs ---
  const songHowlRef = useRef<Howl | null>(null);
  const ambientHowlRef = useRef<Howl | null>(null);

  // Lyrics scrolling refs
  const lyricsContentRef = useRef<HTMLDivElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Audio sources
  const songSrc = "/assets/audio/song.mp3";
  const ambientSrc = "/assets/audio/ambient.mp3";

  // Animation state
  const [scrollInterval, setScrollInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Fixed scroll speed (pixels per second)
  const scrollSpeed = 15;

  // --- Initialize Howler ---
  useEffect(() => {
    try {
      songHowlRef.current = new Howl({
        src: [songSrc],
        loop: true,
        volume: songVolume,
        preload: true,
        onload: () => {
          console.log("Song loaded");
          if (ambientHowlRef.current?.state() === "loaded") {
            setIsAudioReady(true);
          }
        },
        onloaderror: (id, err) => {
          const msg = `Error loading song: ${err}`;
          console.error(msg);
          setAudioError(msg);
        },
        onplayerror: (id, err) => {
          const msg = `Error playing song: ${err}`;
          console.error(msg);
          setAudioError(msg);
        },
      });

      ambientHowlRef.current = new Howl({
        src: [ambientSrc],
        loop: true,
        volume: ambientVolume,
        preload: true,
        onload: () => {
          console.log("Ambient loaded");
          if (songHowlRef.current?.state() === "loaded") {
            setIsAudioReady(true);
          }
        },
        onloaderror: (id, err) => {
          const msg = `Error loading ambient: ${err}`;
          console.error(msg);
          setAudioError(msg);
        },
        onplayerror: (id, err) => {
          const msg = `Error playing ambient: ${err}`;
          console.error(msg);
          setAudioError(msg);
        },
      });
    } catch (e) {
      const msg = `Howler initialization error: ${e}`;
      console.error(msg);
      setAudioError(msg);
    }
    return () => {
      try {
        songHowlRef.current?.unload();
        ambientHowlRef.current?.unload();
        console.log("Howler instances unloaded");
      } catch (e) {
        console.error(`Error during Howler cleanup: ${e}`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Update Howler volume when sliders change ---
  useEffect(() => {
    try {
      songHowlRef.current?.volume(songVolume);
    } catch (e) {
      console.error(`Error setting song volume: ${e}`);
      setAudioError(`Error setting song volume: ${e}`);
    }
  }, [songVolume]);

  useEffect(() => {
    try {
      ambientHowlRef.current?.volume(ambientVolume);
    } catch (e) {
      console.error(`Error setting ambient volume: ${e}`);
      setAudioError(`Error setting ambient volume: ${e}`);
    }
  }, [ambientVolume]);

  // Handle lyrics scrolling (no changes needed here, depends on isPlaying state)
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (lyricsContentRef.current && lyricsContainerRef.current) {
          const currentPosition = lyricsContentRef.current.style.transform;
          const translateY = currentPosition
            ? parseInt(
                currentPosition.replace("translateY(", "").replace("px)", ""),
              )
            : 0;
          const newPosition = translateY - scrollSpeed / 10;
          lyricsContentRef.current.style.transform = `translateY(${newPosition}px)`;

          const contentHeight = lyricsContentRef.current.offsetHeight;
          const containerHeight = lyricsContainerRef.current.offsetHeight;
          if (Math.abs(newPosition) > contentHeight - containerHeight + 100) {
            lyricsContentRef.current.style.transform = "translateY(0)";
          }
        }
      }, 100);
      setScrollInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        setScrollInterval(null);
      }
    }
    // Ensure scrollInterval is not a dependency to avoid potential loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // --- Handle play/pause using Howler ---
  const togglePlayback = () => {
    if (!isAudioReady) {
      const msg = "Audio not ready yet.";
      console.warn(msg);
      setAudioError(msg);
      return;
    }
    try {
      if (isPlaying) {
        songHowlRef.current?.pause();
        ambientHowlRef.current?.pause();
        setIsPlaying(false);
      } else {
        songHowlRef.current?.play();
        ambientHowlRef.current?.play();
        setIsPlaying(true);
      }
    } catch (e) {
      const msg = `Playback error: ${e}`;
      console.error(msg);
      setAudioError(msg);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-6xl mx-auto mt-10 sm:mt-0">
        {/* Controls Panel */}
        <div className="w-auto max-w-xs lg:max-w-sm backdrop-blur-xl bg-white/10 p-3 sm:p-5 rounded-2xl shadow-2xl border border-white/20 mb-4 sm:mb-0">
          <h1 className="text-lg sm:text-2xl font-extrabold mb-3 tracking-tight text-center text-white drop-shadow-lg">
            Chickies Rock
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            {/* Play Button - Disable until audio is ready */}
            <button
              onClick={togglePlayback}
              disabled={!isAudioReady} // Disable button until loaded
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/20 transition-all duration-300 backdrop-blur-sm ${
                isAudioReady
                  ? "hover:bg-white/30 cursor-pointer"
                  : "opacity-50 cursor-not-allowed" // Style when disabled
              }`}
              aria-label={isPlaying ? "Pause" : "Play"}
              aria-disabled={!isAudioReady}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              )}
            </button>

            {/* Volume Controls Container */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Song Volume Control */}
              <div className="relative z-10 flex flex-col items-center w-full sm:w-auto">
                <label className="block text-white text-xs font-medium mb-1 text-center">
                  Song
                </label>
                {/* Mobile (Horizontal) */}
                <div className="block sm:hidden w-full">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={songVolume}
                    onChange={(e) =>
                      setSongVolume(parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    aria-label="Song volume"
                  />
                </div>
                {/* Desktop (Vertical) */}
                <div className="hidden sm:flex h-20 items-center justify-center relative mb-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={songVolume}
                    onChange={(e) =>
                      setSongVolume(parseFloat(e.target.value))
                    }
                    className="h-full appearance-none bg-white/30 rounded-lg cursor-pointer w-2"
                    style={{
                      WebkitAppearance: "slider-vertical",
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                    aria-label="Song volume"
                  />
                </div>
                <span className="text-[10px] text-white/70">
                  {Math.round(songVolume * 100)}%
                </span>
              </div>

              {/* Ambient Volume Control */}
              <div className="relative z-10 flex flex-col items-center w-full sm:w-auto">
                <label className="block text-white text-xs font-medium mb-1 text-center">
                  Ambient
                </label>
                {/* Mobile (Horizontal) */}
                <div className="block sm:hidden w-full">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={ambientVolume}
                    onChange={(e) =>
                      setAmbientVolume(parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    aria-label="Ambient volume"
                  />
                </div>
                {/* Desktop (Vertical) */}
                <div className="hidden sm:flex h-20 items-center justify-center relative mb-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={ambientVolume}
                    onChange={(e) =>
                      setAmbientVolume(parseFloat(e.target.value))
                    }
                    className="h-full appearance-none bg-white/30 rounded-lg cursor-pointer w-2"
                    style={{
                      WebkitAppearance: "slider-vertical",
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                    aria-label="Ambient volume"
                  />
                </div>
                <span className="text-[10px] text-white/70">
                  {Math.round(ambientVolume * 100)}%
                </span>
              </div>
            </div>
          </div>
          {/* Error display for debugging */}
          {audioError && (
            <div className="mt-2 text-sm text-red-500 bg-red-100 rounded p-2 border border-red-300">
              Audio Error: {audioError}
            </div>
          )}
        </div>
        {/* Lyrics Panel (No changes needed here) */}
        <div className="w-auto max-w-xs lg:max-w-sm flex flex-col items-center justify-center">
          <div
            className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-3 sm:p-5 w-full lyrics-glassy-container overflow-hidden relative"
            ref={lyricsContainerRef}
            style={{
              height: "16rem",
              overflow: "hidden",
              position: "relative",
              display: "flex",
            }}
          >
            <div
              className="text-white text-lg sm:text-2xl font-semibold leading-snug drop-shadow-lg lyrics-glassy-text"
              id="lyrics-content"
              ref={lyricsContentRef}
              style={{ willChange: "transform" }}
            >
              {lyrics.map((line, idx) =>
                line === "" ? (
                  <br key={idx} />
                ) : idx === 0 ? (
                  line
                ) : (
                  " " + line
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Remove the HTML Audio Elements --- */}
      {/* <audio ref={songRef} src={songSrc} loop preload="auto" /> */}
      {/* <audio ref={ambientRef} src={ambientSrc} loop preload="auto" /> */}

      {/* Custom scrollbar styling (kept the same) */}
      <style jsx global>{`
        .lyrics-glassy-container::-webkit-scrollbar {
          display: none;
        }
        .lyrics-glassy-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .lyrics-glassy-text {
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6), 0 1px 0 #fff;
        }
      `}</style>
    </div>
  );
}
