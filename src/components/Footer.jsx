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
        toast.success("Thank you for being a subscriber. we'll keep in-touch.");
      } catch {
        toast.error("Subscription failed try again.");
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <footer className="bg-[#152a31] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-12 border-b border-white/10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Strata Logo" className="h-8 w-8 object-contain" />
              <h3 className="text-xl font-bold tracking-tight text-white">Strata</h3>
            </div>
           
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://x.com/makigtawn"
                aria-label="Follow us on X"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/makigtawn"
                aria-label="Connect on LinkedIn"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com/makigtawn"
                aria-label="Check our GitHub"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white hover:underline transition-all">
                  Browse jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gray-500" />
                <span>Bahirdar, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="flex-shrink-0 text-gray-500" />
                <a href="mailto:info@strata.com" className="hover:text-white transition-colors">
                  info@strata.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="flex-shrink-0 text-gray-500" />
                <a href="tel:+251970369110" className="hover:text-white transition-colors">
                  +251970369110
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-sm" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2 rounded bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 w-full transition-all"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2 rounded text-sm font-semibold text-white tracking-wide transition-all shadow-sm ${
                  loading 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-[#ff515b] hover:bg-[#ff646d] active:scale-[0.98]"
                }`}>
                {loading ? <span className="sr-only">Loading...</span> : "Join"}
                {loading && "..."}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div> &copy; {new Date().getFullYear()} Strata. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





