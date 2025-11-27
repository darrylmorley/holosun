import Image, { getImageProps } from "next/image";
import Link from "next/link";
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
    <div className="relative">
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

      <div className="pointer-events-none absolute inset-0 flex items-start justify-end">
        <div className="pointer-events-auto m-4 lg:m-12 max-w-md bg-black/70 text-white p-4 lg:p-6 space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Black Friday Sale
          </p>
          <h2 className="text-2xl lg:text-3xl font-black leading-tight">
            Save on Holosun optics this Black Friday.
          </h2>
          <p className="text-sm lg:text-base">
            Limited-time offers on top-rated red dot and reflex sights while stocks last.
          </p>
          <Link
            href="/shop"
            className="btn btn-accent btn-sm lg:btn-md mt-2 text-white"
          >
            Shop Black Friday deals
          </Link>
        </div>
      </div>
    </div>
  );
}
