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
        toast.success("Thank you for subscribing.");
      } catch {
        toast.error("Subscription failed.");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <footer className="bg-[#152a31] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b border-white/10">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Spering" className="h-8 w-8" />
              <h3 className="text-lg font-bold tracking-tight">Spering</h3>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <a
                href="https://x.com/makigtawn"
                aria-label="X"
                className="hover:text-white transition">
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/makigtawn"
                aria-label="LinkedIn"
                className="hover:text-white transition">
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com/makigtawn"
                aria-label="GitHub"
                className="hover:text-white transition">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Links
            </h4>
            <ul className="flex flex-col space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline opacity-90">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline opacity-90">
                  About
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:underline opacity-90">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Newsletter
            </h4>
            <form className="flex gap-2 max-w-sm" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-1.5 rounded bg-white/10 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-white w-full"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                  loading ? "bg-gray-600" : "bg-[#ff515b] hover:bg-[#ff515b]/90"
                }`}>
                {loading ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt /> Bahirdar, Ethiopia
            </span>
            <a
              href="mailto:info@spering.com"
              className="flex items-center gap-1.5 hover:text-white">
              <FaEnvelope /> info@spering.com
            </a>
            <a
              href="tel:+251970369110"
              className="flex items-center gap-1.5 hover:text-white">
              <FaPhoneAlt /> +251970369110
            </a>
          </div>
          <div>&copy; {new Date().getFullYear()} Spering.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
