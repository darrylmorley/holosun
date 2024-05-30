const slugToId: { [key: string]: number } = {
  'lasers': 139,
  'magnifiers': 4,
  'red-dot-and-holo-point': 80,
  'mounts-and-rails': 36,
};

const idToDescription: { [key: number]: string } = {
  139: 'Shop our range of Lasers',
  4: 'Shop our range of Magnifiers',
  80: 'Shop our range of Red Dot & Holo Points',
  36: 'Shop our range of Mounts & Rails',
};

const idToName: { [key: number]: string } = {
  139: 'Lasers',
  4: 'Magnifiers',
  80: 'Red Dot & Holo Points',
  36: 'Mounts & Rails',
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