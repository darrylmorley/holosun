import Link from "next/link";

export default function MenuDrawer() {
  return (
    <div className="drawer z-10">
      <input
        id="menu-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label
          htmlFor="menu-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu px-4 py-20 w-96 min-h-full bg-white text-base-content">
          <li className="py-3 border-b">
            <Link
              href="/"
              className="hover:bg-accent hover:text-white"
            >
              Home
            </Link>
          </li>
          <li className="py-3 border-b">
            <Link
              href="/shop"
              className="hover:bg-accent hover:text-white"
            >
              Shop
            </Link>
          </li>
          {/* <li className="py-3 border-b"><Link href="/blog">Blog</Link></li> */}
          <li className="py-3 border-b">
            <Link
              href="/about"
              className="hover:bg-accent hover:text-white"
            >
              About
            </Link>
          </li>
          <div className="mt-12">
            <p className="font-bold underline">Need help?</p>
            <p className="mt-3">
              Email:{" "}
              <a
                href="mailto:info@holosun-optics.co.uk"
                className="font-bold hover:text-accent"
              >
                info@holosun-optics.co.uk
              </a>
            </p>
            <p className="mt-1">
              Phone:{" "}
              <a
                href="tel:+441234567890"
                className="font-bold hover:text-accent"
              >
                01527831261
              </a>
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
}
