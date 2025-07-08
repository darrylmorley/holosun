import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

const staticPages = [
  "",
  "about",
  "privacy",
  "terms",
  "shop",
  "support/contact-us",
  "support/model-guide",
  "support/faq",
  "shop/category/red-dot-sights",
  "shop/category/reflex-sights",
  "shop/category/lasers",
  "shop/category/magnifiers",
  "shop/category/mounts-and-rails",
];

export async function GET() {
  // Fetch all product slugs from the database
  const products = await prisma.product.findMany({
    where: { manufacturerID: 272 },
    select: { slug: true, updatedAt: true },
  });

  const baseUrl = "https://www.holosun-optics.co.uk";

  let urls = staticPages
    .map(
      (page) => `
    <url>
      <loc>${page === "" ? baseUrl : `${baseUrl}/${page}`}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("");

  urls += products
    .map(
      (product) => `
    <url>
      <loc>${baseUrl}/shop/${product.slug}</loc>
      <lastmod>${product.updatedAt.toISOString().split("T")[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
