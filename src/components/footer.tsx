import Image from "next/image";
import Link from "next/link";
import logo from "../../public/holosun-logo.webp";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="footer px-5 lg:px-12 py-12 bg-gray-100 text-base-content">
      <aside>
        <Link
          href="/"
          className="mobile-header_logo"
        >
          <Image
            // width={300}
            // height={65}
            src={logo}
            alt="Holosun Logo"
            className="h-10 w-auto"
          />
        </Link>
        <p>
          Holosun Optics UK
          <br />
          Delivering high quality red dot optics
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Products</h6>
        <Link
          href="/shop/category/red-dot-and-holo-point"
          className="link link-hover"
        >
          Red Dots
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
      <nav>
        <h6 className="footer-title">Support</h6>
        <Link
          href="/support/faq"
          className="link link-hover"
        >
          FAQ
        </Link>
        <Link
          href="#"
          className="link link-hover"
        >
          Terms
        </Link>
        <Link
          href="#"
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
      </nav>
      <NewsletterForm />
    </footer>
  );
}
