import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer p-4 pt-8 mt-4 bg-stone-100 text-base-content">
      <aside>
        <Link href="/" className="mobile-header_logo">
          <img src="/holosun-logo.webp" alt="Logo" className="h-7" />
        </Link>
        <p>Holosun Optics UK<br />Delivering high quality red dot optics</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Support</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input type="text" placeholder="username@site.com" className="input input-bordered input-md join-item" />
            <button className="btn btn-md btn-secondary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  )
}