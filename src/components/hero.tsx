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
    width: 1920,
    height: 860,
    quality: 80,
    src: "/images/hero-carousel/aems-banner-1920x860.webp",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 1080,
    height: 1350,
    quality: 70,
    src: "/images/hero-carousel/aems-banner-1080x1350.webp",
  });

  return (
    <picture>
      <source
        media="(min-width: 1000px)"
        srcSet={desktop}
      />
      <source
        media="(min-width: 500px)"
        srcSet={mobile}
      />
      <Image
        {...rest}
        alt={common.alt}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        priority
      />
    </picture>
  );
}
