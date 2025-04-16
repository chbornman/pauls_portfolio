import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    title: "Experience 1",
    image: "/assets/cover1.jpg",
    href: "/tile1",
  },
  {
    title: "Experience 2",
    image: "/assets/cover2.jpg",
    href: "/tile2",
  },
  {
    title: "Experience 3",
    image: "/assets/cover3.jpg",
    href: "/tile3",
  },
  {
    title: "Experience 4",
    image: "/assets/cover4.jpg",
    href: "/tile4",
  },
  {
    title: "Experience 5",
    image: "/assets/cover5.jpg",
    href: "/tile5",
  },
  {
    title: "Experience 6",
    image: "/assets/cover6.jpg",
    href: "/tile6",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-screen grid grid-cols-3 grid-rows-2 gap-0 p-0 m-0">
      {tiles.map((tile, idx) => (
        <Link
          href={tile.href}
          key={tile.title}
          className="group relative w-full h-full overflow-hidden flex items-end justify-start focus:outline-none"
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
          <span className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {tile.title}
          </span>
        </Link>
      ))}
    </main>
  );
}
