import Link from "next/link";

export default function CategoryLinks() {
  return (
    <ul className="menu mt-2 space-y-2">
      <li>
        <Link
          href="/shop/category/magnifiers"
          className="hover:bg-accent hover:text-white"
        >
          Magnifiers
        </Link>
      </li>
      <li>
        <Link
          href="/shop/category/mounts-and-rails"
          className="hover:bg-accent hover:text-white"
        >
          Mounts & Rails
        </Link>
      </li>
      <li>
        <Link
          href="/shop/category/red-dots"
          className="hover:bg-accent hover:text-white"
        >
          Red Dots
        </Link>
      </li>
      <li>
        <Link
          href="/shop/category/lasers"
          className="hover:bg-accent hover:text-white"
        >
          Lasers
        </Link>
      </li>
    </ul>
  );
}
