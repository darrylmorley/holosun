import Link from "next/link";

export const metadata = {
  title: "Safeguarding Your Information at Holosun Optics UK",
  description:
    "At Holosun Optics UK, we take your privacy seriously. Our Privacy Policy outlines our commitment to safeguarding your personal information and data. Learn how we collect, use, and protect your data as you engage with our products and services.",
  openGraph: {
    title: "Safeguarding Your Information at Holosun Optics UK",
    siteName: "Holosun Optics UK",
    description:
      "At Holosun Optics UK, we take your privacy seriously. Our Privacy Policy outlines our commitment to safeguarding your personal information and data. Learn how we collect, use, and protect your data as you engage with our products and services.",
    url: `/privacy`,
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: `https://www.holosun-optics.co.uk/privacy`,
  },
};

export default function Page() {
  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://www.holosun-optics.co.uk/privacy",
    name: "Holosun Privacy Policy",
    description:
      "Holosun Optics UK's privacy policy detailing data protection, GDPR compliance, cookie usage, payment security, and data access and erasure requests.",
    mainEntity: {
      "@type": "Article",
      headline: "Holosun Privacy Policy",
      author: {
        "@type": "Organization",
        name: "Holosun Optics UK",
      },
      publisher: {
        "@type": "Organization",
        name: "Holosun Optics UK",
        logo: {
          "@type": "ImageObject",
          url: "https://www.holosun-optics.co.uk/holosun-logo.webp",
        },
      },
      datePublished: "2024-07-3",
      description:
        "Holosun Optics UK's privacy policy detailing data protection, GDPR compliance, cookie usage, payment security, and data access and erasure requests.",
      articleBody:
        "We analyze traffic to this website to help us improve both what we do as a business and the site itself. We comply with GDPR, and we don’t sell or pass your details on to anyone else for marketing purposes...",
    },
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <div className="mx-8 py-12 text-secondary lg:mx-56">
        <h1
          id="privacy"
          className="mb-4 text-4xl font-black"
        >
          Privacy Policy
        </h1>

        <h2 className="mb-4 mt-8 text-2xl font-black">Links</h2>
        <ul>
          <li>
            <Link
              href="#privacy"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="#cookies"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Cookies
            </Link>
          </li>
          <li>
            <Link
              href="#payment"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Payment Security
            </Link>
          </li>
          <li>
            <Link
              href="#phone-orders"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Telephone Orders
            </Link>
          </li>
          <li>
            <Link
              href="#access-request"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Right of access request
            </Link>
          </li>
          <li>
            <Link
              href="#erasure-request"
              passHref
              className="text-gray-800 hover:text-accent"
            >
              Right of erasure request
            </Link>
          </li>
        </ul>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="privacy"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Privacy
          </h2>
          <p className="my-1">
            We analyse traffic to this website to help us improve both what we do as a business and
            the site itself – we want your experience of the site to run as smoothly as possible.
            Rest assured, we only collect anonymous, aggregate statistics – nothing that could
            identify anyone personally.
          </p>
          <p className="my-1">
            We comply with the General Data Protection Regulation (GDPR), and we don’t sell or pass
            your details on to anyone else for marketing purposes. The only third parties who
            receive your contact information are our couriers and payment providers, for the sole
            purpose of fulfilling your order.
          </p>
          <p className="my-1">
            We do not use your details for marketing purposes without your express consent, and you
            can unsubscribe from our emails at any point using the link in the email. If you object
            to us using your data in any capacity, please contact us{" "}
            <Link
              href="mailto:data@holosun-optics.co.uk"
              passHref
              className="hover:text-secondary text-gray-800"
            >
              data@holosun-optics.co.uk
            </Link>
            .
          </p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="cookies"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Cookies
          </h2>
          <p className="my-1">
            We use cookies to improve your ordering experience. Cookies are tiny text files
            downloaded on to your computer, tablet or smartphone when you visit a website. They help
            us remember you and enable you to use certain features of the site, like saving items in
            your cart and returning to them later (after payday, perhaps). Cookies only give us
            access to information you provide, and you can restrict or disable cookies through your
            internet browser, however this would severely hinder your use of this website.
          </p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="payment"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Payment Security
          </h2>
          <p className="my-1">
            All transactions are processed securely by our merchant service provider. Your credit
            card number will be encrypted when your order is placed using SSL encryption software.
            Our merchant provider then informs us, the outcome of that transaction via the
            encryption system.
          </p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="phone-orders"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Telephone Orders
          </h2>
          <p className="my-1">
            We do not store any credit or debit card details after your telephone order has been
            placed. Once used for the purpose of processing your order all financial details are
            destroyed.
          </p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="access-request"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Right of access request
          </h2>
          <p className="my-1">
            If you would like a copy of the personal data that we have for you, please email{" "}
            <Link
              href="mailto:data@holosun-optics.co.uk"
              passHref
              className="hover:text-secondary text-gray-800"
            >
              data@holosun-optics.co.uk
            </Link>
          </p>
          <p className="my-1">
            We will provide this information free of charge within one month of receiving your
            request.
          </p>
        </div>

        <hr className="my-4" />

        <div className="my-8">
          <h2
            id="erasure-request"
            className="mb-2 mt-4 text-2xl font-bold"
          >
            Right of erasure request
          </h2>
          <p className="my-1">
            You have the right to have all the personal data that we have for you erased. Please
            bear in mind that this will remove you from our mailing lists and customer database
            completely – so if products you have bought from us are still within their warranty
            period, having your data erased may make it harder to address any future issues.
          </p>
          <p className="my-1">
            If you would like to have your data erased, please contact{" "}
            <Link
              href="mailto:data@holosun-optics.co.uk"
              passHref
              className="hover:text-secondary text-gray-800"
            >
              data@holosun-optics.co.uk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
