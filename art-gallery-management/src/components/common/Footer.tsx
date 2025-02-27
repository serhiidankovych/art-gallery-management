import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white bg-black py-6 shadow-xl mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">ArtGalleryManager</h2>
          <p className="text-sm opacity-80">
            Your go-to platform for managing and exploring exquisite art pieces.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaFacebook size={20} className="hover:text-blue-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaTwitter size={20} className="hover:text-blue-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram size={20} className="hover:text-pink-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
