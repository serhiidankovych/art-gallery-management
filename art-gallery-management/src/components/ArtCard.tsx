import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

import { formatPrice } from "../utils/utils";
import { Artwork } from "../types/types";
import ArtCardDialog from "./ArtCardDialog";

interface ArtCardProps {
  artwork: Artwork;
  onDelete: (id: string) => void;
  onEdit: (artwork: Artwork, id: string) => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <CardMedia
        component="img"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 2,
          filter: "blur(10px)",
          zIndex: 0,
          opacity: 0.3,
        }}
        image={artwork.url || "/not-found.jpg"}
        alt={`${artwork.title} Glow`}
      />

      <Card
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(20px) saturate(1.2)",
          background: "rgba(255, 255, 255, 0.1)",
          padding: 1,
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 5,
          transition: "transform 0.3s, box-shadow 0.5s",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          "&:hover": { boxShadow: "0px 8px 20px rgba(50, 69, 114, 0.27)" },
        }}
        onClick={handleClickOpen}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 250, objectFit: "contain", borderRadius: 2 }}
            image={artwork.url || "/not-found.jpg"}
            alt={artwork.title}
          />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" noWrap>
                <strong>{artwork.title}</strong>
              </Typography>
              <Typography variant="subtitle1">
                $<strong>{formatPrice(artwork.price)}</strong>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              By {artwork.artist}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ArtCardDialog
        isEditing={true}
        open={open}
        artwork={artwork}
        onClose={handleClose}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={() => {}}
      />
    </Box>
  );
};

export default ArtCard;
