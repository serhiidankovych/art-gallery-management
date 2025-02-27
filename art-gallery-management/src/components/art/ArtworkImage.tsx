import React from "react";
import { CardMedia } from "@mui/material";

interface ArtworkImageProps {
  url: string;
  title: string;
}

const ArtworkImage: React.FC<ArtworkImageProps> = ({ url, title }) => {
  return (
    <CardMedia
      component="img"
      sx={{
        width: "50%",
        maxHeight: "550px",
        objectFit: "cover",
        borderRadius: 2,
      }}
      image={url || "/not-found.jpg"}
      alt={title}
    />
  );
};

export default ArtworkImage;
