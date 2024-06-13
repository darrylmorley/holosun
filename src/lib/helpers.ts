const slugToId: { [key: string]: number } = {
  lasers: 139,
  magnifiers: 4,
  "red-dot-and-holo-point": 80,
  "mounts-and-rails": 36,
};

const idToSlug: { [key: number]: string } = {
  139: "lasers",
  4: "magnifiers",
  80: "red-dot-and-holo-point",
  36: "mounts-and-rails",
};

const idToDescription: { [key: number]: string } = {
  139: "Shop our Lasers",
  4: "Shop our Magnifiers",
  80: "Shop our Red Dot & Holo Points",
  36: "Shop our Mounts & Rails",
};

const idToName: { [key: number]: string } = {
  139: "Lasers",
  4: "Magnifiers",
  80: "Red Dot & Holo Points",
  36: "Mounts & Rails",
};

export function getIdFromSlug(slug: string): number | undefined {
  return slugToId[slug];
}

export function getSlugFromId(id: number): string | undefined {
  return idToSlug[id];
}

export function getDescriptionFromId(id: number): string | undefined {
  return idToDescription[id];
}

export function getNameFromId(id: number): string | undefined {
  return idToName[id];
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
