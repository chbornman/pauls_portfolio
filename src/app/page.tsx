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
    <main className="h-screen w-screen grid grid-cols-3 grid-rows-2 gap-0 p-0 m-0 overflow-hidden select-none">
      {tiles.map((tile, idx) => (
        <Link
          href={tile.href}
          key={tile.title}
          className="group relative w-full h-full overflow-hidden flex items-end justify-center focus:outline-none"
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
          <span
            className={`absolute bottom-1/2 left-1/2 translate-x-[-50%] translate-y-[50%] text-white text-4xl md:text-5xl lg:text-6xl font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-center select-none pointer-events-none ${dancingScript.className} drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]`}
          >
            {tile.title}
          </span>
        </Link>
      ))}
    </main>
  );
}
