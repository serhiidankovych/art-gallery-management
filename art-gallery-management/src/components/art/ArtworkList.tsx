import React from "react";
import ArtCard from "./ArtCard";
import { Artwork } from "../../types/types";
import { Typography } from "@mui/material";

interface ArtworkListProps {
  artworks: Artwork[];
  status: string;
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks, status }) => {
  if (status === "loading") {
    return (
      <div className="text-center py-10">
        <Typography variant="h6" color="textSecondary">
          Loading...
        </Typography>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-10">
        <Typography variant="h6" color="textSecondary">
          No artworks found
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      {artworks.map((artwork) => (
        <ArtCard key={artwork._id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
