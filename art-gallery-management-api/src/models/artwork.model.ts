import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 99 },
  artist: { type: String, required: true, maxlength: 50 },
  type: {
    type: String,
    required: true,
    enum: ["painting", "sculpture", "photography", "drawing"],
  },
  price: { type: Number, required: true, min: 0 },
  availability: { type: Boolean, default: true },
  url: { type: String, required: true },
});

export const Artwork = mongoose.model("Artwork", artworkSchema);
