import { NextRequest } from "next/server";

import prisma from "@/lib/db/prisma";

import ImageGallery from "@/components/image-gallery";

async function getItem(request) {
  const slug = request.params.slug;

  return await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });
}

export default async function Page(request: NextRequest) {
  const item = await getItem(request);

  const images = Array.isArray(item.Images.Image)
    ? item.Images.Image.map((image) => {
        return `${image.baseImageURL}/w_800/${image.publicID}.webp`;
      })
    : [`${item.Images.Image.baseImageURL}/w_800/${item.Images.Image.publicID}.webp`];

  return (
    <div className="px-4 xl:px-12 lg:my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageGallery
          images={images}
          name={item.name}
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">{item.name}</h1>
          <p className="text-lg">£{new Intl.NumberFormat("en-GB").format(item.price)}</p>
          <p
            dangerouslySetInnerHTML={{ __html: item.shortDescription }}
            className="prose text-base leading-relaxed"
          />
        </div>
      </div>
      <div>
        <p
          dangerouslySetInnerHTML={{ __html: item.longDescription }}
          className="prose text-base leading-relaxed"
        />
      </div>
    </div>
  );
}
