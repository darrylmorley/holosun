import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
} from "@react-email/components";

const baseUrl = process.env.NODE_ENV == "production" ? "https://holosun.com" : "localhost:3000";

export default function ItemEnquiry(formData) {
  return (
    <Html
      lang="en"
      dir="ltr"
    >
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#f9f9f9",
                secondary: "#161616",
                accent: "#ff3131",
                "accent-content": "#e40000",
                neutral: "#3d4451",
                "base-100": "#ffffff",
              },
              fontFamily: {
                sans: ["Archivo", "sans-serif"],
              },
            },
          },
        }}
      >
        <Font
          fontFamily="Archivo"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Body className="bg-white">
          <Container className="py-12 shadow-lg bg-stone-100 my-12 p-12">
            <Img
              src={`${baseUrl}/holosun-logo.png`}
              width="493"
              height="108"
              alt="Holosun Optics"
              className="mx-auto"
            />
            <Heading className="text-center text-xl py-4">
              You have a new item enquiry from the Holosun website
            </Heading>
            <Section className="flex mt-12">
              <p>
                <span className="font-bold">Item ID: </span>
                {formData.itemId}
              </p>
              <p>
                <span className="font-bold">Item Name: </span>
                {formData.itemName}
              </p>
              <p>
                <span className="font-bold">From: </span>
                {formData.name}
              </p>
              <p>
                <span className="font-bold">Message: </span>
                {formData.message}
              </p>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ItemEnquiry.PreviewProps = {
  name: "Darryl",
  message: "I'm interested in your products.",
  itemId: "12345",
  itemName: "Holosun Optics",
};
