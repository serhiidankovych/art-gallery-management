import React, { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoTrash, IoClose } from "react-icons/io5";
import { Artwork } from "../types/types";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface ArtCardDialogProps {
  isEditing: boolean;
  open: boolean;
  artwork: Artwork;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (artwork: Artwork, id: string) => void;
  onAdd: (artwork: Artwork) => void;
}

const ArtCardDialog: React.FC<ArtCardDialogProps> = ({
  isEditing,
  open,
  artwork,
  onClose,
  onDelete,
  onEdit,
  onAdd,
}) => {
  const [editableArtwork, setEditableArtwork] = useState<Artwork>(artwork);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableArtwork({ ...editableArtwork, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(editableArtwork, artwork.id);
    onClose();
  };

  const handleDeleteClick = () => {
    setOpenConfirm(true);
  };

  const handleAdd = () => {
    onAdd(editableArtwork);
    setEditableArtwork({} as Artwork);
    onClose();
  };

  const handleConfirmDelete = () => {
    onDelete(artwork.id);
    setOpenConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: "800px",
            width: "100%",
            margin: "auto",
          },
        }}
      >
        <DialogActions sx={{ padding: 1 }}>
          {isEditing && (
            <IconButton onClick={handleDeleteClick} color="error">
              <IoTrash />
            </IconButton>
          )}

          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <IoClose size={25} />
          </IconButton>
        </DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 400,
              width: 500,
              objectFit: "contain",
              borderRadius: 2,
            }}
            image={editableArtwork.url || "/not-found.jpg"}
            alt={editableArtwork.title}
          />
          <Box sx={{ marginLeft: 2, flex: 1 }}>
            <DialogTitle
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editableArtwork.title}
                onChange={handleChange}
                variant="standard"
              />
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Artist"
                name="artist"
                value={editableArtwork.artist}
                onChange={handleChange}
                variant="standard"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={editableArtwork.price}
                onChange={handleChange}
                variant="standard"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={editableArtwork.type}
                onChange={handleChange}
                variant="standard"
              />
              <RadioGroup
                name="availability"
                value={
                  editableArtwork.availability ? "available" : "not available"
                }
                onChange={(e) =>
                  setEditableArtwork({
                    ...editableArtwork,
                    availability: e.target.value === "available",
                  })
                }
              >
                <FormControlLabel
                  value="available"
                  control={<Radio />}
                  label="Available"
                />
                <FormControlLabel
                  value="not available"
                  control={<Radio />}
                  label="Not Available"
                />
              </RadioGroup>

              <TextField
                fullWidth
                label="URL"
                name="url"
                value={editableArtwork.url}
                onChange={handleChange}
                variant="standard"
              />
            </DialogContent>
          </Box>
        </Box>
        <DialogActions>
          {isEditing ? (
            <Button onClick={handleSave} variant="contained" color="primary">
              Save{" "}
            </Button>
          ) : (
            <Button
              onClick={() => handleAdd()}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        PaperProps={{ sx: { borderRadius: 2, padding: 2 } }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this artwork?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ArtCardDialog;
