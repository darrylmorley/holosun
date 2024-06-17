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

export default function officeSaleEmail(props) {
  const { customerData, itemLines } = props;

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
                {customerData.firstName} {customerData.lastName}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {customerData.email}
              </p>
              <p>
                <span className="font-bold">Address: </span>
                {customerData.address1}, {customerData.city}, {customerData.postcode}
              </p>
            </Section>
            <Section>
              {itemLines.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-between py-4"
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

officeSaleEmail.PreviewProps = {
  customerData: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    address1: "1234 Main St",
    city: "Anytown",
    postcode: "B60 3DR",
  },
  itemLines: [
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
