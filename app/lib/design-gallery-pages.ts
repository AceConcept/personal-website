/** Design gallery page slugs and titles – used for routes and index links */
export const DESIGN_GALLERY_PAGES = [
  { slug: "eva", title: "Eva" },
  { slug: "valentia", title: "Valentia" },
  { slug: "roga", title: "Roga" },
  { slug: "polar-systems", title: "Polar Systems" },
] as const;

export type DesignGallerySlug = (typeof DESIGN_GALLERY_PAGES)[number]["slug"];

export function getDesignGalleryTitle(slug: string): string | null {
  const page = DESIGN_GALLERY_PAGES.find((p) => p.slug === slug);
  return page ? page.title : null;
}

export function isDesignGallerySlug(slug: string): slug is DesignGallerySlug {
  return DESIGN_GALLERY_PAGES.some((p) => p.slug === slug);
}
