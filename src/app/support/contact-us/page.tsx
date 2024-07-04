import ContactForm from "@/components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Holosun Optics UK - Reach Our Team",
  description:
    "Get in touch with our team for help with your red dot sights, magnifiers, aiming lasers, and mounts. We're here to provide expert guidance and address any inquiries you may have.",
};

export default function Page() {
  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-5xl font-black uppercase">Contact Us</h1>
        <p className="text-lg text-center">
          Get in touch with our team for help with your red dot sights, magnifiers, aiming lasers,
          and mounts.
        </p>
      </div>
      <div className="mb-12 flex flex-col bg-white lg:mb-0 lg:flex-row lg:px-24 lg:py-12">
        <div className="order-last flex flex-col space-y-8 bg-secondary px-6 py-12 text-gray-200 lg:order-first lg:w-1/3 lg:p-12 lg:shadow-lg">
          <p className="text-2xl font-bold">Contact Us</p>
          <div className="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Holosun Optics UK, 38 Sherwood Road, Bromsgrove, Worcestershire, B60 3DR</span>
          </div>
          <div className="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>01527 831 261</span>
          </div>
          <div className="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>info@holosun-optics.co.uk</span>
          </div>
        </div>
        {/* Get In Touch */}
        <ContactForm />
      </div>
    </>
  );
}
