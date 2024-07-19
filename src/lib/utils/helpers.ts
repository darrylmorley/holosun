type Category = {
  id: number;
  slug: string;
  description: string;
  name: string;
  metaName?: string;
  metaDescription?: string;
};

export const categories: Category[] = [
  {
    id: 139,
    slug: "lasers",
    name: "Lasers",
    metaName: "Holosun Aiming Lasers - Accurate and Reliable Targeting",
    description: "Discover Holosun's advanced aiming lasers, designed for accuracy and durability",
    metaDescription:
      "Holosun's advanced aiming lasers are designed for accuracy and durability. Our lasers ensure precise target acquisition in any condition!",
  },
  {
    id: 4,
    slug: "magnifiers",
    name: "Magnifiers",
    metaName: "Holosun Red Dot Magnifiers - Enhance Your Shooting Precision",
    description:
      "Discover Holosun's range of high-quality tactical red dot magnifiers designed to improve your shooting accuracy",
    metaDescription:
      "Holosun high-quality magnifiers are designed to improve your shooting accuracy. Perfect for pairing with our red dot sights!",
  },
  {
    id: 80,
    slug: "red-dot-sights",
    name: "Red Dot Sights",
    metaName: "Holosun Red Dot Sights - Precision Optics for Every Shooter",
    description:
      "Explore Holosun's range of innovative red dot sights designed for accuracy and durability",
    metaDescription:
      "Holosun red dot sights are designed for accuracy, durability, and reliable performance in any environment. Perfect for shooters of all levels!",
  },
  {
    id: 36,
    slug: "mounts-and-rails",
    name: "Mounts & Rails",
    description:
      "Discover Holosun's range of mounts designed for secure and stable attachment of your optics",
    metaName: "Holosun Mounts - Secure and Reliable Optics Mounting",
    metaDescription:
      "Holosun mounts are designed for secure attachment of your optics. Engineered for precision, our mounts ensure your red dot sights stay perfectly aligned.",
  },
  {
    id: 336,
    slug: "reflex-sights",
    name: "Reflex Sights",
    description: "Explore our range of high-quality reflex sights. Perfect for precision shooting.",
    metaName: "Holosun Reflex Sights - Superior Accuracy and Performance",
    metaDescription: "High quality Reflex Sights form Holosun. Perfect for precision shooting!",
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

// Identify if a postcode is outside of mainland UK
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

export function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  modal.close();
}

// Capitalise first letter of each word in a string
export const capitalise = (string: string) => {
  if (!string) return "";
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Strip html from strings
export function stripHtml(html) {
  // Remove HTML tags using a regular expression
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}
