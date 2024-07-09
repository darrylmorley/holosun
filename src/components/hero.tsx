import Image, { getImageProps } from "next/image";

export default function Hero() {
  const common = {
    alt: "AEMS Red Dot Sight with Solar Failsafe and Shake Awake technology.",
    sizes: "100vw",
    priority: true,
  };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 0,
    height: 0,
    quality: 80,
    src: "https://res.cloudinary.com/shooting-supplies/image/upload/v1720530008/holosun-optics.co.uk/hero-carousel/ekzsc8x3ur2141uug7yx.webp",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 0,
    height: 0,
    quality: 70,
    src: "https://res.cloudinary.com/shooting-supplies/image/upload/v1720530009/holosun-optics.co.uk/hero-carousel/yx1z2tfhtm2lkwpr2xne.webp",
  });

  return (
    <picture>
      <source
        media="(min-width: 1000px)"
        srcSet={desktop}
      />
      <source
        media="(min-width: 320px)"
        srcSet={mobile}
      />
      <Image
        {...rest}
        alt={common.alt}
        priority
        sizes="100vw"
        className="w-full h-auto object-cover"
      />
    </picture>
  );
}
