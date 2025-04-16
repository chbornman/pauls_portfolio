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
  const [songVolume, setSongVolume] = useState(0.5);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const songRef = useRef<HTMLAudioElement>(null);
  const ambientRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Local audio file paths
  const songSrc = "/assets/audio/song.mp3";
  const ambientSrc = "/assets/audio/ambient.mp3";

  // Handle volume changes
  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = songVolume;
      console.log('Song volume set to', songVolume);
    }
    if (ambientRef.current) {
      ambientRef.current.volume = ambientVolume;
      console.log('Ambient volume set to', ambientVolume);
    }
  }, [songVolume, ambientVolume]);

  useEffect(() => {
    if (songRef.current) {
      songRef.current.oncanplay = () => {
        console.log('Song is ready to play.');
      };
      songRef.current.onerror = (e) => {
        console.error('Song playback error:', e);
      };
    }
    if (ambientRef.current) {
      ambientRef.current.oncanplay = () => {
        console.log('Ambient is ready to play.');
      };
      ambientRef.current.onerror = (e) => {
        console.error('Ambient playback error:', e);
      };
    }
  }, []);

  // Handle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      songRef.current?.pause();
      ambientRef.current?.pause();
      console.log('Paused both tracks');
    } else {
      // Try to play both audio tracks
      try {
        if (songRef.current) {
          const songPromise = songRef.current.play();
          if (songPromise) {
            songPromise.then(() => console.log('Song started playing'))
              .catch(e => console.error('Song play error', e));
          }
        }
        
        if (ambientRef.current) {
          const ambientPromise = ambientRef.current.play();
          if (ambientPromise) {
            ambientPromise.then(() => console.log('Ambient started playing'))
              .catch(e => console.error('Ambient play error', e));
          }
        }
        
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  // Auto-advance lyrics
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentLyricIndex(prev => (prev + 1) % lyrics.length);
    }, 4000); // Change lyrics every 4 seconds
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Get visible lyrics (current line and a few surrounding lines)
  const getVisibleLyrics = () => {
    const visibleCount = 3; // Number of lines visible at once
    const lyricsToShow = [];
    
    for (let i = currentLyricIndex; i < currentLyricIndex + visibleCount; i++) {
      const index = i % lyrics.length;
      lyricsToShow.push({
        text: lyrics[index],
        index
      });
    }
    
    return lyricsToShow;
  };

  // --- Auto-scroll lyrics (faster and smoother) ---
  useEffect(() => {
    const lyricsDiv = lyricsContainerRef.current;
    const song = songRef.current;
    if (!lyricsDiv || !song) return;

    let animationFrame: number;
    // Scroll duration is 1/2 of the song duration for faster scroll
    const scrollDuration = song.duration ? song.duration / 2 : 1;

    function scrollLyrics() {
      if (!isPlaying || !song.duration) return;
      // Use elapsed time since play started for smooth, continuous scroll
      const progress = Math.min(song.currentTime / scrollDuration, 1);
      const maxScroll = lyricsDiv.scrollHeight - lyricsDiv.clientHeight;
      const targetScroll = maxScroll * progress;
      lyricsDiv.scrollTop += (targetScroll - lyricsDiv.scrollTop) * 0.2; // smooth easing
      if (progress < 1) {
        animationFrame = requestAnimationFrame(scrollLyrics);
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(scrollLyrics);
    }
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying]);

  // Reset scroll on song restart
  useEffect(() => {
    if (!isPlaying && lyricsContainerRef.current) {
      lyricsContainerRef.current.scrollTop = 0;
    }
  }, [isPlaying]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/chickies_rock.jpg"
        alt="Chickies Rock"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="relative flex flex-col lg:flex-row items-center justify-center h-full w-full gap-8 lg:gap-24 px-4"
          style={{ minHeight: '80vh' }}
        >
          {/* Audio Controls */}
          <div className="w-full max-w-md mb-12 lg:mb-0 flex-shrink-0 flex flex-col items-center justify-center">
            <div className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20 w-full">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">Chickies Rock</h2>
              
              {/* Play/Pause Button */}
              <button 
                onClick={togglePlayback}
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 16 16">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                )}
              </button>
              
              {/* Song Volume Control */}
              <div className="mb-8">
                <label className="block text-white text-lg font-medium mb-3">Song Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={songVolume}
                  onChange={(e) => setSongVolume(parseFloat(e.target.value))}
                  className="w-full h-3 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>0%</span>
                  <span>{Math.round(songVolume * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Ambient Volume Control */}
              <div className="mb-8">
                <label className="block text-white text-lg font-medium mb-3">Ambient Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={ambientVolume}
                  onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                  className="w-full h-3 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>0%</span>
                  <span>{Math.round(ambientVolume * 100)}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* Back to Home Button */}
              <Link 
                href="/"
                className="block w-full text-center py-3 px-6 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white text-lg mt-10"
              >
                Back to Experiences
              </Link>
            </div>
          </div>

          {/* Lyrics Panel */}
          <div className="w-full lg:w-3/5 max-w-2xl flex flex-col items-center justify-center">
            <div 
              className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-xl h-96 lyrics-glassy-container"
              ref={lyricsContainerRef}
              style={{ minHeight: '24rem', maxHeight: '24rem', overflowY: 'hidden' }}
            >
              <div className="text-white text-5xl font-semibold leading-snug drop-shadow-lg lyrics-glassy-text" id="lyrics-content">
                {lyrics.map((line, idx) => (
                  <p key={idx} className="mb-12">{line}</p>
                ))}
              </div>
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
