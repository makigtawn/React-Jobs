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
import Button from "./Button";

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
        toast.success("Thank you for being a subscriber. we'll keep in-touch.");
      } catch {
        toast.error("Subscription failed try again.");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <footer className=" dark:bg-nav-bg bg-nav-bg text-text-primary dark:text-text-primary  border border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-12 border-b border-white/10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Strata Logo" className="h-9 w-auto" />
              <h3 className="text-xl font-bold tracking-tight text-text-primary dark:text-text-primary ">
                Strata
              </h3>
            </Link>

            <div className="flex items-center gap-4 pt-2 lg:py-4">
              <a
                href="https://x.com/makigtawn"
                aria-label="Follow us on X"
                className="p-2 bg-white/5 rounded-full hover:bg-black/10 hover:text-black transition-colors">
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/makigtawn"
                aria-label="Connect on LinkedIn"
                className="p-2 bg-white/5 rounded-full hover:bg-black/10 hover:text-black transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com/makigtawn"
                aria-label="Check our GitHub"
                className="p-2 bg-white/5 rounded-full hover:bg-black/10 hover:text-black transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider  mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary ">
              <li>
                <Link to="/" className="hover:text-text-primary ">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-text-primary ">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className=" hover:text-text-primary">
                  Browse jobs
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-text-secondary">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm ">
              <li className="flex items-start gap-2.5 hover:text-text-primary">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 " />
                <span>Bahirdar, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-text-primary">
                <FaEnvelope className="flex-shrink-0 text-gray-500" />
                <a href="mailto:info@strata.com" className=" transition-colors">
                  info@strata.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 hover:text-text-primary">
                <FaPhoneAlt className="flex-shrink-0 text-gray-500" />
                <a href="tel:+251970369110" className=" transition-colors">
                  +251970369110
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h4 className="text-xs text-center font-bold uppercase tracking-wider text-text-primary dark:text-text-primary  mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 max-w-sm"
              onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2 rounded bg-black/10 border border-white/10 text-text-primary dark:text-text-primary  placeholder:text-text-secondary text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 w-full transition-all"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className={`text-sm tracking-wide shadow-sm active:scale-[0.98] ${
                  loading ? "bg-gray-600" : "bg-[#21b8b2] hover:bg-[#21b8b2]/50"
                }`}>
                {loading ? (
                  <>
                    <span className="sr-only">Loading...</span>
                    ...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div>
            {" "}
            &copy; {new Date().getFullYear()} Strata. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
