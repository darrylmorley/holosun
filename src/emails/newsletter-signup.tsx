import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";

const baseUrl =
  process.env.NODE_ENV == "production" ? "https://www.holosun-optics.co.uk.com" : "localhost:3000";

export default function NewsletterSignup() {
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
          <Container className="p-12 shadow-lg bg-stone-100 text-center">
            <Section>
              <Img
                src={`${baseUrl}/holosun-logo.png`}
                width="256"
                height="54"
                alt="Holosun Optics"
                className="mx-auto"
              />
              <Heading
                as="h1"
                className="mt-8"
              >
                Thankyou for signing up to our newsletter!
              </Heading>
            </Section>
            <Section className="mt-4">
              <Heading as="h4">
                You&apos;ll be among the first to receive updates on new gear, special offers &
                more!
              </Heading>
            </Section>
            <Hr />
            <Section className="my-4">
              <div className="flex justify-center gap-3">
                <Link
                  href="https://www.facebook.com/holosunuk"
                  target="_blank"
                  rel="noopener"
                >
                  <Img
                    src={"/static/facebook.png"}
                    width="32"
                    height="32"
                    alt="Twitter"
                    className="mx-auto"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/holosun_optics/"
                  target="_blank"
                  rel="noopener"
                >
                  <Img
                    src={"/static/instagram.png"}
                    width="32"
                    height="32"
                    alt="Twitter"
                    className="mx-auto"
                  />
                </Link>
                <Link
                  href="https://x.com/holosunopticsuk"
                  target="_blank"
                  rel="noopener"
                >
                  <Img
                    src={"/static/twitter.png"}
                    width="32"
                    height="32"
                    alt="Twitter"
                    className="mx-auto"
                  />
                </Link>
              </div>
            </Section>
            <Section className="mt-4">
              <Text className="text-xs">
                Holosun Optics UK is a trading name of Shooting Supplies Ltd. Registered in England
                and Wales. Company No. 05156277. VAT No. GB 793098878.
              </Text>
              <Text className="text-xs">
                Tel: 01527 831 261, Email: info@shootingsuppliesltd.co.uk
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewsletterSignup.PreviewProps = {
  email: "someemail@somedomain.com",
};
