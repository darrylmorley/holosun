import Image from "next/image";
import { getFormattedPrice, getMainImage } from "@/lib/helpers";

export default function CategoryCarousel({ items }) {
  console.log(items);
  return (
    <>
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="w-full h-full carousel-item items-center justify-center"
          >
            <div className="relative h-[16rem] w-full flex items-center">
              <Image
                src={getMainImage(item)}
                width={300}
                height={300}
                alt={item.name}
              />
            </div>
            <div className="h-[9rem] text-left flex flex-col justify-center gap-2">
              <h3 className="text-xl">{item.name}</h3>
              <p className="text-base">{getFormattedPrice(item.price)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
