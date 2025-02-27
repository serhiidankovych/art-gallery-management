import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import {
  editArtwork,
  deleteArtwork,
  addArtwork,
} from "../../slices/artworksSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoTrash, IoClose } from "react-icons/io5";
import { Artwork } from "../../types/types";
import ArtworkForm from "./ArtworkForm";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";
import { DialogTitle } from "@mui/material";

interface ArtworkDialogProps {
  isEditing: boolean;
  open: boolean;
  artwork: Artwork;
  onClose: () => void;
}

const ArtworkDialog: React.FC<ArtworkDialogProps> = ({
  isEditing,
  open,
  artwork,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSave = (updatedArtwork: Artwork) => {
    if (isEditing) {
      if (artwork._id) {
        dispatch(editArtwork({ id: artwork._id, updatedArtwork }));
      } else {
        console.error("Artwork ID is undefined, cannot edit.");
      }
    } else {
      dispatch(addArtwork(updatedArtwork));
    }
    onClose();
  };

  const handleDelete = () => {
    if (artwork._id) {
      dispatch(deleteArtwork(artwork._id));
      setOpenConfirm(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { maxWidth: 800 } }}
      >
        <DialogTitle>{isEditing ? "Edit Artwork" : "Add Artwork"}</DialogTitle>
        <DialogActions
          sx={{ padding: 1, position: "absolute", top: 0, right: 0 }}
        >
          {isEditing && artwork._id && (
            <IconButton onClick={() => setOpenConfirm(true)} color="error">
              <IoTrash />
            </IconButton>
          )}
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <IoClose size={25} />
          </IconButton>
        </DialogActions>

        <ArtworkForm
          artwork={artwork}
          isEditing={isEditing}
          onSave={handleSave}
        />
      </Dialog>

      <DeleteConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ArtworkDialog;
