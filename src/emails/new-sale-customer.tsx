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
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const baseUrl =
  process.env.NODE_ENV == "production" ? "https://holosun-optics.co.uk" : "localhost:3000";

export default function OfficeSaleEmail(props) {
  const { customer, lines, orderID } = props.data;

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
                width="246"
                height="54"
                alt="Holosun Optics"
                className="mx-auto"
              />
              <Heading
                as="h1"
                className="mt-8"
              >
                We&apos;ve Got Your Order!
              </Heading>
              <Heading as="h2">Order No. {orderID}</Heading>
            </Section>
            <Hr />
            <Section className="mt-4">
              <Heading as="h3">Your Delivery Details</Heading>
              <Text>
                <span className="font-bold">Name: </span>
                {customer.firstName} {customer.lastName}
              </Text>
              <Text>
                <span className="font-bold">Email: </span>
                {customer.email}
              </Text>
              <Text>
                <span className="font-bold">Address: </span>
                {customer.deliveryAddress1}, {customer.deliveryCity}, {customer.deliveryPostcode}
              </Text>
            </Section>
            <Hr />
            <Section className="mt-4">
              <Heading as="h3">Your Items</Heading>
              {lines.map((item) => {
                return (
                  <Text key={item.id}>
                    {item.description} x {item.qty}
                  </Text>
                );
              })}
            </Section>
            <Hr />
            <Section className="my-4">
              <div className="flex justify-center gap-3">
                <Link
                  href="https://www.facebook.com/holosunuk"
                  target="_blank"
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
                and Wales. Company No. 05266110. VAT No. 278 7492 92.
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

OfficeSaleEmail.PreviewProps = {
  data: {
    orderID: 1234,
    customer: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      deliveryAddress1: "1234 Other St",
      deliveryCity: "Othertown",
      deliveryPostcode: "B60 3JS",
    },
    lines: [
      {
        id: 1,
        description: "Holosun Optics",
        qty: 1,
      },
      {
        id: 2,
        description: "Holosun Optics Elite",
        qty: 1,
      },
    ],
  },
};
