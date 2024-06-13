import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = {
  id: number;
  slug: string;
  description: string;
  name: string;
  metaName?: string;
  metaDescription?: string;
};

const categories: Category[] = [
  {
    id: 139,
    slug: "lasers",
    description: "Discover Holosun's advanced aiming lasers, designed for accuracy and durability",
    name: "Lasers",
    metaName: "Holosun Aiming Lasers - Precision Targeting",
    metaDescription:
      "Discover Holosun's advanced aiming lasers, designed for accuracy and durability. Ideal for law enforcement, military, and tactical applications, our lasers ensure precise target acquisition in any condition. Shop our range now for superior performance.",
  },
  {
    id: 4,
    slug: "magnifiers",
    description:
      "Discover Holosun's range of high-quality magnifiers designed to improve your shooting accuracy",
    name: "Magnifiers",
    metaName: "Holosun Magnifiers - Enhance Your Shooting Precision",
    metaDescription:
      "Discover Holosun's range of high-quality magnifiers designed to improve your shooting accuracy. Perfect for pairing with red dot sights, our magnifiers offer superior clarity and durability. Shop now for precision optics!",
  },
  {
    id: 80,
    slug: "red-dot-and-holo-point",
    description:
      "Explore Holosun's range of innovative red dot sights designed for accuracy and durability",
    name: "Red Dot & Holo Points",
    metaName: "Holosun Red Dot Sights - Precision Optics for Every Shooter",
    metaDescription:
      "Explore Holosun's range of innovative red dot sights designed for accuracy and durability. Perfect for shooters of all levels, our red dot sights offer fast target acquisition and reliable performance in any environment. Shop now for top-tier optics!",
  },
  {
    id: 36,
    slug: "mounts-and-rails",
    description:
      "Discover Holosun's range of mounts designed for secure and stable attachment of your optics",
    name: "Mounts & Rails",
    metaName: "Holosun Mounts - Secure and Reliable Optics Mounting Solutions",
    metaDescription:
      "Discover Holosun's range of mounts designed for secure and stable attachment of your optics. Engineered for durability and precision, our mounts ensure your red dot sights and magnifiers stay perfectly aligned. Shop now for top-quality mounting solutions!",
  },
];

export function getCategoryById(id: number): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getIdFromSlug(slug: string): number | undefined {
  const category = getCategoryBySlug(slug);
  return category?.id;
}

export function getSlugFromId(id: number): string | undefined {
  const category = getCategoryById(id);
  return category?.slug;
}

export function getDescriptionFromId(id: number): string | undefined {
  const category = getCategoryById(id);
  return category?.description;
}

export function getNameFromId(id: number): string | undefined {
  const category = getCategoryById(id);
  return category?.name;
}

export function getMetaNameFromId(id: number): string | undefined {
  const category = getCategoryById(id);
  return category?.metaName;
}

export function getMetaDescriptionFromId(id: number): string | undefined {
  const category = getCategoryById(id);
  return category?.metaDescription;
}

export function formatCartItem(item) {
  const isOnSale = item.onSale;

  const cartImage = Array.isArray(item.Images?.Image)
    ? `${item.Images?.Image[0].baseImageURL}/w_100/${item.Images?.Image[0].publicID}.webp`
    : `${item.Images?.Image.baseImageURL}/w_100/${item.Images?.Image.publicID}.webp`;

  return {
    id: item.id,
    name: item.name,
    brand: item.Manufacturer?.name,
    sku: item.sku,
    price: isOnSale === "true" ? item.salePrice : item.price,
    image: cartImage,
    qoh: item.qoh,
  };
}

export function getMainImage(item, width: number = 300) {
  const image = Array.isArray(item.Images.Image)
    ? `${item.Images.Image[0].baseImageURL}/w_${width}/${item.Images.Image[0].publicID}.webp`
    : `${item.Images.Image.baseImageURL}/w_${width}/${item.Images.Image.publicID}.webp`;

  return image;
}

export function getFormattedPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "gbp",
  }).format(price);
}

export function toggleDrawer(drawName: string) {
  document.getElementById(`${drawName}`)?.click();
}

export function isOutsideMainlandUK(postcode: string) {
  const postcodeRegex =
    /\b(BT\d{1,2}\s?\d[A-Z]{2}|GY\d{1,2}\s?\d[A-Z]{2}|JE\d{1,2}\s?\d[A-Z]{2}|IM\d{1,2}\s?\d[A-Z]{2}|HS\d{1,2}\s?\d[A-Z]{2}|IV\d{1,2}\s?\d[A-Z]{2}|KW\d{1,2}\s?\d[A-Z]{2}|ZE\d{1,2}\s?\d[A-Z]{2})\b/i;
  return postcodeRegex.test(postcode);
}

export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
