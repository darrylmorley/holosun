"use client";
import { useEffect, useRef } from "react";

export default function Parallax({ imageSrc, altText }) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = window.scrollY;
        parallaxRef.current.style.backgroundPositionY = `${offset * 0.64}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-[70dvh]">
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundAttachment: "scroll", // Ensure it scrolls smoothly
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <h2 className="px-28 text-3xl font-bold text-white">{altText}</h2>
      </div>
    </div>
  );
}
