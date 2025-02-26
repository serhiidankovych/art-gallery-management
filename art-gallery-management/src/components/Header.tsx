import React from "react";
import { IoColorPalette } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 sticky top-0 z-50 drop-shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black flex items-center gap-2">
          <IoColorPalette
            className="text-3xl text-black"
            aria-label="Art Gallery Logo"
          />
          ArtGalleryManager
        </h1>
      </div>
    </header>
  );
};

export default Header;
