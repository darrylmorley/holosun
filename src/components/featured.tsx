import { getFormattedPrice } from "@/lib/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function Featured({ featuredItems }) {
  return (
    <>
      <h3 className="text-center text-4xl font-black my-12">FEATURED HOLOSUN OPTICS</h3>
      <ul className="grid grid-cols-2 gap-2 px-4 lg:px-24">
        {featuredItems
          .sort((a, b) => a.price - b.price)
          .map((item) => {
            const image = item.Images.Image[0]
              ? `${item.Images.Image[0].baseImageURL}/w_400/${item.Images.Image[0].publicID}.webp`
              : `${item.Images.Image.baseImageURL}/w_400/${item.Images.Image.publicID}.webp`;

            return (
              <li
                key={item.id}
                className="bg-stone-100 flex flex-col items-center justify-center p-8"
              >
                <div className="flex flex-col items-center justify-between h-full space-y-4">
                  <picture className="flex justify-center items-center">
                    <Image
                      src={image}
                      alt={item.name}
                      width={300}
                      height={300}
                      sizes="(min-width: 200px) and (max-width: 800px) 110px, (min-width: 800px) 300px"
                    />
                  </picture>
                  <h3 className="text-sm lg:text-xl font-black text-center">{item.name}</h3>
                  <p className="text-lg text-center">{getFormattedPrice(item.price)}</p>
                  <Link
                    href={`/shop/${item.slug}`}
                    passHref
                  >
                    <button
                      className="btn btn-secondary hover:btn-accent hover:text-white text-white self-center"
                      data-umami-event="featured-item-click"
                      type="button"
                      title="Buy Now"
                    >
                      BUY NOW
                    </button>
                  </Link>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
