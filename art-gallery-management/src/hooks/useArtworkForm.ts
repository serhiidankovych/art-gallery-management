import { useState } from "react";
import { Artwork } from "../types/types";

const useArtworkForm = (initialArtwork: Artwork) => {
  const [formState, setFormState] = useState<Artwork>(initialArtwork);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | { target: { name: string; value: unknown } }
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateArtwork = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.title) {
      newErrors.title = "Title is required";
    } else if (formState.title.length > 99) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formState.artist) {
      newErrors.artist = "Artist name is required";
    } else if (formState.artist.length > 50) {
      newErrors.artist = "Artist name must be less than 50 characters";
    }

    if (!formState.type) {
      newErrors.type = "Artwork type is required";
    }

    if (formState.price <= 0) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formState.price))) {
      newErrors.price = "Price must be a number";
    } else if (Number(formState.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // URL validation
    if (!formState.url) {
      newErrors.url = "Image URL is required";
    }

    // Availability validation
    if (formState.availability === undefined) {
      newErrors.availability = "Availability status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formState, errors, handleChange, validateArtwork };
};

export default useArtworkForm;
