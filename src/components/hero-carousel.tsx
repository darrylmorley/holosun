"use client";
import { getImageProps } from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const common = {
    alt: "AEMS Red Dot Sight with Solar Failsafe and Shake Awake technology.",
    sizes: "100vw",
    priority: true,
  };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1920,
    height: 860,
    quality: 80,
    src: "/images/hero-carousel/aems-banner-1920x860.jpg",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 1350,
    height: 1080,
    quality: 70,
    src: "/images/hero-carousel/aems-banner-1080x1350.jpg",
  });

  return (
    <Slider
      {...settings}
      className="overflow-hidden"
    >
      <div>
        <picture>
          <source
            media="(min-width: 1000px)"
            srcSet={desktop}
          />
          <source
            media="(min-width: 500px)"
            srcSet={mobile}
          />
          <img
            {...rest}
            alt={common.alt}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </picture>
      </div>
      <div>Mounts</div>
      <div>Red Dot</div>
    </Slider>
  );
}
