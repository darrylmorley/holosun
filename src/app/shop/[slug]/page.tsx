import { ShieldCheck } from "lucide-react";
import { NextRequest } from "next/server";
import dynamic from "next/dynamic";
import Link from "next/link";

import prisma from "@/lib/db/prisma";

const AddToCartButton = dynamic(() => import("@/components/add-to-cart-button"));
import DeliveryModal from "@/components/delivery-modal";
import QuestionModal from "@/components/question-modal";
import ImageGallery from "@/components/image-gallery";
import ShareButton from "@/components/share-button";

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
    <div className="px-4 xl:px-12 mb-4 lg:my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <ImageGallery
          images={images}
          name={item.name}
        />

        <div className="flex flex-col gap-8">
          <h1 className="text-3xl">{item.name}</h1>
          <p className="text-xl font-semibold">
            {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
              item.price
            )}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: item.shortDescription }}
            className="prose text-base leading-relaxed flex flex-grow"
          />
          <AddToCartButton item={item} />
          <div className="mt-4">
            <ul className="flex flex-wrap gap-8">
              <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                <QuestionModal />
              </li>

              <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                <DeliveryModal />
              </li>
              <li className="flex items-center gap-2 hover:text-accent text-sm lg:text-base cursor-pointer">
                <ShareButton
                  title={item.name}
                  text={`Check out this ${item.name} @ holosun.co.uk!`}
                  url={request.url}
                />
              </li>
            </ul>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center gap-4 text-xs lg:text-base">
            <ShieldCheck />
            <span className="flex flex-col wrap">Secure checkout with Barclays</span>
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-visa"
              >
                <title id="pi-visa">Visa</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                  fill="#142688"
                ></path>
              </svg>

              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-master"
              >
                <title id="pi-master">Mastercard</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <circle
                  fill="#EB001B"
                  cx="15"
                  cy="12"
                  r="7"
                ></circle>
                <circle
                  fill="#F79E1B"
                  cx="23"
                  cy="12"
                  r="7"
                ></circle>
                <path
                  fill="#FF5F00"
                  d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                ></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="pi-american_express"
                viewBox="0 0 38 24"
                width="38"
                height="24"
              >
                <title id="pi-american_express">American Express</title>
                <path
                  fill="#000"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                  opacity=".07"
                ></path>
                <path
                  fill="#006FCF"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                ></path>
                <path
                  fill="#FFF"
                  d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                ></path>
                <path
                  fill="#006FCF"
                  d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                ></path>
                <path
                  fill="#006FCF"
                  d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                ></path>
                <path
                  fill="#FFF"
                  d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                ></path>
                <path
                  fill="#006FCF"
                  d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                ></path>
                <path
                  fill="#006FCF"
                  d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <p
          dangerouslySetInnerHTML={{ __html: item.longDescription }}
          className="prose text-base leading-relaxed"
        />
      </div> */}
    </div>
  );
}
