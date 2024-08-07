"use client";
import Image from "next/image";
import Link from "next/link";

import { toggleDrawer } from "@/lib/utils/helpers";

export default function SearchDrawerFeatured({ item }) {
  const image = item.Images.Image[0]
    ? `${item.Images.Image[0].baseImageURL}/w_70/${item.Images.Image[0].publicID}.webp`
    : `${item.Images.Image.baseImageURL}/w_70/${item.Images.Image.publicID}.webp`;

  return (
    <li
      key={item.id}
      className="flex"
    >
      <Link
        href={`/shop/${item.slug}`}
        onClick={() => toggleDrawer("search-drawer")}
      >
        <div className="flex">
          <picture className="relative flex justify-center items-center min-w-20 min-h-20 mr-2 bg-stone-300">
            <Image
              src={image}
              width={80}
              height={80}
              alt={item.name}
              className="p-2"
            />
          </picture>
          <div className="flex flex-col gap-2">
            <p className="text-sm self-start">{item.name}</p>
            <span className="text-sm self-start">
              {Intl.NumberFormat("gb", {
                style: "currency",
                currency: "GBP",
              }).format(item.price)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
