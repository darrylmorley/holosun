"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, name, isSaleItem }) {
  const [mainImg, setMainImg] = useState(images[0]);

  const handleImageHover = (image) => {
    setMainImg(image);
  };

  const handleMainImageClick = (image) => {
    window.open(image, "_blank");
  };

  return (
    <div className="relative overflow-hidden flex flex-col lg:flex-row gap-2 lg:gap-4">
      {isSaleItem && (
        <div className="z-10 absolute right-0 top-0 h-16 w-16">
          <div className="absolute transform rotate-45 bg-secondary text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
            <span>Sale</span>
          </div>
        </div>
      )}
      <div className="flex flex-row lg:flex-col items-center gap-2 order-2 lg:order-first">
        {images.map((image) => (
          <div
            key={image}
            className="bg-stone-100 hover:bg-stone-300 cursor-pointer"
          >
            <Image
              width={100}
              height={100}
              src={image}
              key={image}
              alt={`Image of ${name}`}
              priority
              className="p-2"
              onMouseEnter={() => handleImageHover(image)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center bg-stone-100">
        <Image
          src={mainImg}
          alt={`Product Image of ${name}`}
          width={800}
          height={800}
          priority
          onMouseDown={() => handleMainImageClick(mainImg)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
