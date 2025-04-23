import { stripHtml } from "@/lib/utils/helpers";
import dynamic from "next/dynamic";

import prisma from "@/lib/db/prisma";

const AddToCartButton = dynamic(() => import("@/components/add-to-cart-button"));
import DeliveryModal from "@/components/delivery-modal";
import QuestionModal from "@/components/question-modal";
import ImageGallery from "@/components/image-gallery";
import ShareButton from "@/components/share-button";
import { capitalise } from "@/lib/utils/helpers";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
    url: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const item = await getItem(slug);

  if (!item) notFound();

  const images = Array.isArray(item.Images.Image)
    ? // @ts-expect-error - Images is not defined in the Prisma schema
    item.Images.Image.map((image) => {
      return `${image.baseImageURL}/w_1500/${image.publicID}.webp`;
    })
    : // @ts-expect-error - Images is not defined in the Prisma schema
    [`${item.Images.Image.baseImageURL}/w_1500/${item.Images.Image.publicID}.webp`];

  const description = stripHtml(item.shortDescription);

  return {
    title: `${capitalise(item.name)}`,
    description: `${description}`,
    alternates: {
      canonical: `https://www.holosun-optics.co.uk/shop/${item.slug}`,
    },
    openGraph: {
      title: `${capitalise(item.name)}`,
      description:
        "Holosun Optics UK for advanced red dot sights, reflex sights, and tactical red dot sights. Shop now for innovative technology, rugged designs, and unparalleled performance!",
      url: `https://www.holosun-optics.co.uk/shop/${item.slug}`,
      images: [
        {
          url: images[0],
          width: 1500,
          height: 1500,
        },
      ],
      locale: "en_GB",
      type: "website",
      price: item.price,
      currency: "GBP",
      availability: item.qoh > 0 ? "instock" : "outofstock",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalise(item.name)}`,
      description: `${description}`,
      images: images,
    },
  };
}

async function getItem(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const url = `https://www.holosun-optics.co.uk/${slug}`;
  const item = await getItem(slug);

  // @ts-expect-error - Images is not defined in the Prisma schema
  const images = Array.isArray(item.Images.Image)
    ? // @ts-expect-error - Images is not defined in the Prisma schema
    item.Images.Image.map((image) => {
      return `${image.baseImageURL}/w_1500/${image.publicID}.webp`;
    })
    : // @ts-expect-error - Images is not defined in the Prisma schema
    [`${item.Images.Image.baseImageURL}/w_1500/${item.Images.Image.publicID}.webp`];

  const description = stripHtml(item.shortDescription);

  const isSaleItem =
    item.CustomFieldValues.CustomFieldValue.some(
      (field) => field.customFieldID === "12" && field.value === "true"
    ) || item.onSale === true;

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    url: `https://www.holosun-optics.co.uk/shop/${slug}`,
    sku: item.sku.replaceAll(" ", ""),
    image: images[0],
    description: description,
    mpn: item.manufacturerSku.replaceAll(" ", ""),
    brand: {
      "@type": "Brand",
      name: "Holosun",
    },
    manufacturer: "Holosun",
    offers: {
      "@type": "Offer",
      url: `https://www.holosun-optics.co.uk/shop/${slug}`,
      priceCurrency: "GBP",
      price: item.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: item.qoh > 0 ? "https://schema.org/InStock" : "https://schema.org/BackOrder",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        url: "https://www.holosun-optics.co.uk/terms#cancellation",
        returnPolicyCategory: "https://schema.org/ReturnFeesCustomerResponsibility",
        applicableCountry: {
          "@type": "Country",
          name: "GB",
        },
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
      },
      shippingDetails: [
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "5.95",
            currency: "GBP",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 2,
              unitCode: "d",
            },
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 1,
              unitCode: "d",
            },
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "GB",
            addressRegion: "GB-EAW, GB-SCT",
          },
        },
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "10.00",
            currency: "GBP",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 2,
              unitCode: "d",
            },
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 1,
              unitCode: "d",
            },
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "GB",
            addressRegion: "GB-NIR, GB-ELS, GB-ORK",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <div className="px-4 xl:px-12 mb-4 lg:my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImageGallery
            images={images}
            name={item.name}
            isSaleItem={isSaleItem}
          />

          <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-black">{item.name}</h1>
            {isSaleItem ? (
              <p>
                <span className="line-through text-sm">
                  {new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                    item.price
                  )}
                </span>
                <span className="ml-2">
                  {" "}
                  {new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                    item.salePrice
                  )}
                </span>
              </p>
            ) : (
              new Intl.NumberFormat("en-GB", { style: "currency", currency: "gbp" }).format(
                item.price
              )
            )}
            <div
              dangerouslySetInnerHTML={{ __html: item.shortDescription }}
              className="prose text-base leading-relaxed flex flex-grow"
            />
            <AddToCartButton item={item} />
            <div className="mt-4">
              <ul className="flex flex-wrap gap-8">
                <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                  <QuestionModal item={item} />
                </li>

                <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                  <DeliveryModal />
                </li>
                <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                  <ShareButton
                    title={item.name}
                    url={url}
                    itemID={item.id}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
