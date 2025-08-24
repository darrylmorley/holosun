import Image from "next/image";
import Link from "next/link";
import logo from "../../public/holosun-logo.webp";
import NewsletterForm from "./newsletter-form";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import PaymentMethods from "./payment-methods";

export default function Footer() {
  return (
    <footer className="bg-white text-base-content border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="px-5 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4"
            >
              <Image
                src={logo}
                alt="Holosun Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mb-4">
              Holosun Optics UK
              <br />
              Delivering high quality red dot optics
            </p>
            <div className="space-y-2">
              <p>
                Email:{" "}
                <a
                  href="mailto:info@holosun-optics.co.uk"
                  className="font-bold hover:text-accent"
                >
                  info@holosun-optics.co.uk
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:01527831261"
                  className="font-bold hover:text-accent"
                >
                  01527831261
                </a>
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h6 className="footer-title mb-4">Products</h6>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/shop/category/red-dot-sights"
                className="link link-hover"
              >
                Red Dot Sights
              </Link>
              <Link
                href="/shop/category/reflex-sights"
                className="link link-hover"
              >
                Reflex Sights
              </Link>
              <Link
                href="/shop/category/lasers"
                className="link link-hover"
              >
                Lasers
              </Link>
              <Link
                href="/shop/category/magnifiers"
                className="link link-hover"
              >
                Magnifiers
              </Link>
              <Link
                href="/shop/category/mounts-and-rails"
                className="link link-hover"
              >
                Mounts
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h6 className="footer-title mb-4">Support</h6>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/support/faq"
                className="link link-hover"
              >
                FAQ
              </Link>
              <Link
                href="/support/model-guide"
                className="link link-hover"
              >
                Model Guide
              </Link>
              <Link
                href="/terms"
                className="link link-hover"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="link link-hover"
              >
                Privacy policy
              </Link>
              <Link
                href="/support/contact-us"
                className="link link-hover"
              >
                Contact Us
              </Link>
              <a
                href="https://highland-defence.co.uk/"
                rel="nofollow noopener"
                target="_blank"
                className="link link-hover"
              >
                Military Enquiries
              </a>
            </nav>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h6 className="footer-title mb-4">Newsletter</h6>
            <p className="mb-4 text-sm">Enter your email address</p>
            <NewsletterForm />

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/holosunuk"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="hover:text-accent transition-colors"
              >
                <FaFacebookSquare className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/holosun_optics"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="hover:text-accent transition-colors"
              >
                <FaInstagramSquare className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/holosunopticsuk"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
                className="hover:text-accent transition-colors"
              >
                <FaTwitterSquare className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 px-5 lg:px-12 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; 2025 Holosun Optics UK. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <PaymentMethods />
          </div>
        </div>
      </div>
    </footer>
  );
}
