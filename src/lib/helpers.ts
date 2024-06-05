const slugToId: { [key: string]: number } = {
  lasers: 139,
  magnifiers: 4,
  "red-dot-and-holo-point": 80,
  "mounts-and-rails": 36,
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

export function getDescriptionFromId(id: number): string | undefined {
  return idToDescription[id];
}

export function getNameFromId(id: number): string | undefined {
  return idToName[id];
}
