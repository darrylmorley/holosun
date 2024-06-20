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
        <div className="flex mt-2 gap-3">
          <Link
            href="https://www.facebook.com/holosunuk"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0v24h24v-24h-24zm16 7h-1.923c-.616 0-1.077.252-1.077.889v1.111h3l-.239 3h-2.761v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/holosun_optics/"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M14.667 12c0 1.473-1.194 2.667-2.667 2.667-1.473 0-2.667-1.193-2.667-2.667 0-1.473 1.194-2.667 2.667-2.667 1.473 0 2.667 1.194 2.667 2.667zm3.846-3.232c.038.843.046 1.096.046 3.232s-.008 2.389-.046 3.233c-.1 2.15-1.109 3.181-3.279 3.279-.844.038-1.097.047-3.234.047-2.136 0-2.39-.008-3.232-.046-2.174-.099-3.181-1.132-3.279-3.279-.039-.845-.048-1.098-.048-3.234s.009-2.389.047-3.232c.099-2.152 1.109-3.181 3.279-3.279.844-.039 1.097-.047 3.233-.047s2.39.008 3.233.046c2.168.099 3.18 1.128 3.28 3.28zm-2.405 3.232c0-2.269-1.84-4.108-4.108-4.108-2.269 0-4.108 1.839-4.108 4.108 0 2.269 1.84 4.108 4.108 4.108 2.269 0 4.108-1.839 4.108-4.108zm1.122-4.27c0-.53-.43-.96-.96-.96s-.96.43-.96.96.43.96.96.96c.531 0 .96-.43.96-.96zm6.77-7.73v24h-24v-24h24zm-4 12c0-2.172-.009-2.445-.048-3.298-.131-2.902-1.745-4.52-4.653-4.653-.854-.04-1.126-.049-3.299-.049s-2.444.009-3.298.048c-2.906.133-4.52 1.745-4.654 4.653-.039.854-.048 1.127-.048 3.299 0 2.173.009 2.445.048 3.298.134 2.906 1.746 4.521 4.654 4.654.854.039 1.125.048 3.298.048s2.445-.009 3.299-.048c2.902-.133 4.522-1.745 4.653-4.654.039-.853.048-1.125.048-3.298z" />
            </svg>
          </Link>
          <Link
            href="https://x.com/holosunopticsuk"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0v24h24v-24h-24zm18.862 9.237c.208 4.617-3.235 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.079-4.03 3.198-4.03.944 0 1.797.398 2.396 1.037.748-.147 1.451-.42 2.085-.796-.245.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.44.656-.997 1.234-1.638 1.697z" />
            </svg>
          </Link>
        </div>
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
