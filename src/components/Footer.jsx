import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-10 px-2 pt-10 pb-8 sm:px-6 lg:px-4 bg-[var(--color-nav-bg)] border-t border-[var(--color-border)] text-[var(--color-text-primary)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img
            src={logo}
            alt="Spering Logo"
            className="h-14 w-14 rounded-2xl shadow-lg"
          />
          <div>
            <span className="block text-2xl font-black tracking-[0.2em]">
              Spering
            </span>
            <span className="block text-xs tracking-[0.24em] text-[var(--color-text-secondary)]">
              HIRE PREMIUM DEVELOPERS
            </span>
          </div>
        </div>

        <div className="text-left text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>Bahirdar, Ethiopia</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-red-500" />
            <a href="mailto:info@spering.com" className="underline">
              info@spering.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500" />
            <a href="tel:+251900000000" className="underline">
              +251 970 369 110
            </a>
          </div>
        </div>

        <div className="flex gap-6 text-2xl mt-4 md:mt-0">
          <a
            href="https://x.com/makigtawn"
            aria-label="x"
            className="hover:text-blue-400 transition-colors">
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com/makigtawn"
            aria-label="LinkedIn"
            className="hover:text-blue-700 transition-colors">
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/makigtawn"
            aria-label="GitHub"
            className="hover:text-gray-800 transition-colors">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 border-t border-[var(--color-border)] pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
        <div>
          &copy; {new Date().getFullYear()} Spering. All rights reserved.
        </div>
        <div>
          Built by the Spering Team. Connect with us for partnerships, support,
          or feedback.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
