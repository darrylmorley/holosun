"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ item: product, index }) {
  let imgUrl;
  let img2Url;

  const isSaleItem =
    product.CustomFieldValues.CustomFieldValue.some(
      (field) => field.customFieldID === "12" && field.value === "true"
    ) || product.onSale === true;

  if (Array.isArray(product.Images.Image)) {
    imgUrl = `${product.Images.Image[0].baseImageURL}/w_300/${product.Images.Image[0].publicID}.webp`;
    img2Url = `${product.Images.Image[1].baseImageURL}/w_300/${product.Images.Image[1].publicID}.webp`;
  } else {
    imgUrl = `${product.Images.Image.baseImageURL}/w_300/${product.Images.Image.publicID}.webp`;
  }

  const [isImg2Loaded, setIsImg2Loaded] = useState(false);

  return (
    <div
      key={product.id}
      className="group relative overflow-hidden"
    >
      {isSaleItem && (
        <div className="z-10 absolute right-0 top-0 h-16 w-16">
          <div className="absolute transform rotate-45 bg-secondary text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
            <span>Sale</span>
          </div>
        </div>
      )}
      <Link
        href={`/shop/${product.slug}`}
        className="relative mb-2 flex h-80 items-center justify-center overflow-hidden bg-stone-100 hover:bg-stone-300 lg:mb-3"
        prefetch={false}
      >
        <div className="relative w-[250px] h-full flex flex-col justify-center items-center">
          <Image
            src={imgUrl}
            alt={product.name}
            width={300}
            height={300}
            priority={index <= 3}
            className={`absolute transition-opacity duration-600 ease-in-out ${isImg2Loaded ? "group-hover:opacity-0" : "opacity-100"}`}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,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"
          />
          {img2Url && (
            <Image
              src={img2Url}
              alt={product.name}
              width={300}
              height={300}
              priority={index <= 3}
              className="absolute opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100"
              onLoad={() => setIsImg2Loaded(true)}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,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"
            />
          )}
        </div>

        {product.onSale && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            sale
          </span>
        )}
      </Link>
      <div>
        <Link
          href={`/shop/${product.slug}`}
          className="hover:gray-800 mb-1 font-black transition duration-100"
        >
          {product.name}
        </Link>

        <div className="flex items-end gap-2">
          <span>
            {isSaleItem ? (
              <>
                <span className="line-through text-sm">
                  {new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                    product.price
                  )}
                </span>
                <span>
                  {" "}
                  {new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                    product.salePrice
                  )}
                </span>
              </>
            ) : (
              new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                product.price
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
