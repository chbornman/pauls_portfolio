import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

const tiles = [
  {
    title: "Chickies Rock",
    image: "/assets/cover1.jpg",
    href: "/tile1",
  },
  {
    title: "Safe Harbor",
    image: "/assets/cover2.jpg",
    href: "/tile2",
  },
  {
    title: "Wrightsville",
    image: "/assets/cover3.jpg",
    href: "/tile3",
  },
  {
    title: "Turkey Hill",
    image: "/assets/cover4.jpg",
    href: "/tile4",
  },
  {
    title: "Conejohela Flats",
    image: "/assets/cover5.jpg",
    href: "/tile5",
  },
  {
    title: "Susquehannock State Park",
    image: "/assets/cover6.jpg",
    href: "/tile6",
  },
];

export default function Home() {
  return (
    <main className="h-screen w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-0 p-0 m-0 overflow-hidden select-none">
      {tiles.map((tile, idx) => (
        <Link
          href={tile.href}
          key={tile.title}
          className="group relative w-full h-full overflow-hidden flex items-center justify-center focus:outline-none"
          style={{ aspectRatio: '1/1' }}
        >
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-100 group-focus:scale-105"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-50 group-active:opacity-40 transition-opacity duration-300" />
          
          {/* Title Container - Styled like tile1 page */}
          <div className="relative w-full max-w-md flex flex-col items-center justify-center z-10 p-4">
            <div className="backdrop-blur-xl bg-white/10 p-8 rounded-[32px] shadow-2xl border border-white/20 w-full overflow-hidden relative before:absolute before:inset-0 before:rounded-[32px] before:backdrop-blur-md before:bg-transparent before:z-[-1]">
              <h2 className={`text-white text-3xl md:text-4xl font-bold text-center ${dancingScript.className}`}>
                {tile.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}
