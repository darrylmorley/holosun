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

export default function OfficeSaleEmail(props) {
  const { customer, lines } = props.data;

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
              src={"/static/holosun-logo.png"}
              width="493"
              height="108"
              alt="Holosun Optics"
              className="mx-auto"
            />
            <Heading className="text-center text-xl py-4">
              You have a new Holosun Optics sale!
            </Heading>
            <Section className="flex mt-12">
              <p>
                <span className="font-bold">Name: </span>
                {customer.firstName} {customer.lastName}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {customer.email}
              </p>
              <p>
                <span className="font-bold">Address: </span>
                {customer.deliveryAddress1}, {customer.deliveryCity}, {customer.deliveryPostcode}
              </p>
            </Section>
            <Section>
              {lines.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex"
                  >
                    <p>
                      {item.name} x {item.quantity}
                    </p>
                  </div>
                );
              })}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OfficeSaleEmail.PreviewProps = {
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
      name: "Holosun Optics",
      quantity: 1,
    },
    {
      id: 2,
      name: "Holosun Optics Elite",
      quantity: 1,
    },
  ],
};
