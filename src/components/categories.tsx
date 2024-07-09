import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2 mt-2">
      <Link href="/shop/category/red-dot-sights">
        <div className="relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-300 hover:bg-secondary group">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white font-black transition-all duration-200 ease-in-out">
            RED DOTS
          </p>
          <Image
            src="/images/category/holosun-red-dot.webp"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
            sizes="(min-width: 200px) and (max-width: 800px) 100px, (min-width: 800px) 400px"
          />
        </div>
      </Link>
      <Link href="/shop/category/lasers">
        <div className="group relative col-span-1 h-[30rem] w-full flex justify-center items-center bg-stone-100 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white font-black transition-all duration-200 ease-in-out">
            LASERS
          </p>
          <Image
            src="/images/category/holosun-laser.webp"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
            sizes="(min-width: 200px) and (max-width: 800px) 100px, (min-width: 800px) 400px"
          />
        </div>
      </Link>
      <Link href="/shop/category/magnifiers">
        <div className="group relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-100 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white font-black transition-all duration-200 ease-in-out">
            MAGNIFIERS
          </p>
          <Image
            src="/images/category/holosun-magnifier.webp"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
            sizes="(min-width: 200px) and (max-width: 800px) 100px, (min-width: 800px) 400px"
          />
        </div>
      </Link>
      <Link href="/shop/category/mounts-and-rails">
        <div className="group relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-300 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white font-black transition-all duration-200 ease-in-out hover:bg-accent">
            MOUNTS
          </p>
          <Image
            src="/images/category/holosun-spacer.webp"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
            sizes="(min-width: 200px) and (max-width: 800px) 100px, (min-width: 800px) 400px"
          />
        </div>
      </Link>
    </div>
  );
}
