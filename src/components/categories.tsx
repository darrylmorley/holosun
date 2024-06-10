import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      <Link href="/shop/category/red-dot-and-holo-point">
        <div className="relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-300 hover:bg-secondary group">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white transition-all duration-200 ease-in-out">
            Red Dots
          </p>
          <Image
            src="/images/category/holosun-red-dot.png"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
          />
        </div>
      </Link>
      <Link href="/shop/category/lasers">
        <div className="group relative col-span-1 h-[30rem] w-full flex justify-center items-center bg-stone-100 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white transition-all duration-200 ease-in-out">
            Lasers
          </p>
          <Image
            src="/images/category/holosun-laser.png"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
          />
        </div>
      </Link>
      <Link href="/shop/category/magnifiers">
        <div className="group relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-100 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white transition-all duration-200 ease-in-out">
            Magnifiers
          </p>
          <Image
            src="/images/category/holosun-magnifier.png"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
          />
        </div>
      </Link>
      <Link href="/shop/category/mounts-and-rails">
        <div className="group relative h-[30rem] w-full flex justify-center items-center col-span-1 bg-stone-300 hover:bg-secondary">
          <p className="absolute invisible group-hover:visible group-hover:bg-secondary group-hover:px-3 group-hover:py-2 group-hover:rounded-sm z-10 text-center text-3xl text-white transition-all duration-200 ease-in-out hover:bg-accent">
            Mounts
          </p>
          <Image
            src="/images/category/holosun-spacer.png"
            width={400}
            height={400}
            alt="Holosun Red Dot Sight"
          />
        </div>
      </Link>
    </div>
  );
}
