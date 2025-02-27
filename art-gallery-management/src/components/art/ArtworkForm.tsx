import React, { useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import ArtworkImage from "./ArtworkImage";
import { Artwork } from "../../types/types";
import useArtworkForm from "../../hooks/useArtworkForm";

interface ArtworkFormProps {
  artwork: Artwork;
  isEditing: boolean;
  onSave: (artwork: Artwork) => void;
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({
  artwork,
  isEditing,
  onSave,
}) => {
  const { formState, errors, handleChange, validateArtwork } =
    useArtworkForm(artwork);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (validateArtwork()) {
      onSave(formState);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <ArtworkImage url={formState.url} title={formState.title} />

      <Box
        sx={{
          marginLeft: 1,
          flex: 1,
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <TextField
          inputRef={titleInputRef}
          fullWidth
          label="Title"
          name="title"
          value={formState.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          fullWidth
          label="Artist"
          name="artist"
          value={formState.artist}
          onChange={handleChange}
          error={!!errors.artist}
          helperText={errors.artist}
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formState.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />

        <Select
          fullWidth
          label="Type"
          name="type"
          value={formState.type}
          onChange={handleChange}
          error={!!errors.type}
        >
          <MenuItem value="painting">Painting</MenuItem>
          <MenuItem value="sculpture">Sculpture</MenuItem>
          <MenuItem value="drawing">Drawing</MenuItem>
          <MenuItem value="photography">Photography</MenuItem>
          <MenuItem value="digital Art">Digital Art</MenuItem>
        </Select>

        <TextField
          fullWidth
          label="URL"
          name="url"
          value={formState.url}
          onChange={handleChange}
          error={!!errors.url}
          helperText={errors.url}
        />

        <RadioGroup
          name="availability"
          value={formState.availability ? "available" : "not available"}
          onChange={(e) =>
            handleChange({
              target: {
                name: "availability",
                value: e.target.value === "available",
              },
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

        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? "Save" : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default ArtworkForm;
