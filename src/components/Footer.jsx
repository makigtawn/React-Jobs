import React, { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = email.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const list = JSON.parse(
          localStorage.getItem("newsletterSubscribers") || "[]",
        );
        if (!list.includes(trimmed)) list.push(trimmed);
        localStorage.setItem("newsletterSubscribers", JSON.stringify(list));
        setEmail("");
        toast.success(
          "Thank you for subscribing. You have been successfully added to our mailing list.",
        );
      } catch {
        toast.error("Subscription failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <footer className="bg-[#152a31] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Spering" className="h-12 w-12" />
            <div>
              <h3 className="text-xl font-bold">Spering</h3>
            </div>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-4 text-lg">
            <a
              href="https://x.com/makigtawn"
              aria-label="x"
              className="hover:opacity-80">
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com/makigtawn"
              aria-label="LinkedIn"
              className="hover:opacity-80">
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/makigtawn"
              aria-label="GitHub"
              className="hover:opacity-80">
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase">
              Useful Link
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-90 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-90 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="opacity-90 hover:underline">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/categories" className="opacity-90 hover:underline">
                  Category
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase">Newsletter</h4>
            <p className="text-sm opacity-90 mb-3">
              Get the latest jobs and updates straight to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              onSubmit={handleSubmit}>
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-md w-full sm:flex-1 bg-white text-[#152a31] placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={loading}
                className={
                  loading
                    ? "mt-2 sm:mt-0 sm:ml-2 px-4 py-2 rounded-md text-white bg-gray-400"
                    : "mt-2 sm:mt-0 sm:ml-2 px-4 py-2 rounded-md text-white bg-[#ff515b] hover:opacity-95"
                }>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <p className="text-xs opacity-70 mt-2">
              We won't share your email. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>Bahirdar, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <a href="mailto:info@spering.com" className="underline">
                  info@spering.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <a href="tel:+251970369110" className="underline">
                  +251970369110
                </a>
              </div>
            </div>

            <div className="text-xs opacity-90">
              &copy; {new Date().getFullYear()} Spering. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
