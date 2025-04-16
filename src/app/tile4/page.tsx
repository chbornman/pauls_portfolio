"use client";

import Image from "next/image";
import Link from "next/link";

export default function Tile4Page() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden flex flex-col items-center justify-center px-2 sm:px-8 py-4">
      {/* Background Image */}
      <Image
        src="/assets/nature4.jpg"
        alt="Nature 4 Background"
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
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center text-white hover:scale-110 transition-transform duration-200 drop-shadow-lg p-4 sm:p-8 bg-black/10 rounded-2xl backdrop-blur-xl border border-white/20">
          Placeholder for Tile 4
        </h1>
      </div>
    </div>
  );
}
