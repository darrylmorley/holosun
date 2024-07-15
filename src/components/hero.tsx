import Image, { getImageProps } from "next/image";
import DesktopHeroImage from "../../public/images/hero-carousel/aems-banner-1920x860.webp";
import MobileHeroImage from "../../public/images/hero-carousel/aems-banner-1080x1350.webp";

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
    src: DesktopHeroImage,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 0,
    height: 0,
    quality: 70,
    src: MobileHeroImage,
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
