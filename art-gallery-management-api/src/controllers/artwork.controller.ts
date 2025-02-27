import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Artwork } from "../models/artwork.model";
import mongoose from "mongoose";

export const getArtworks = async (req: Request, res: Response) => {
  try {
    const { price, artist, type } = req.query;
    let query: any = {};
    if (artist) query.artist = artist;
    if (type) query.type = type;

    let artworks = Artwork.find(query);
    if (price) artworks = artworks.sort({ price: price === "asc" ? 1 : -1 });

    res.json(await artworks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getArtworkById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: "Invalid artwork ID format" });
      return;
    }

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }

    res.json(artwork);
  } catch (err) {
    console.error("Error fetching artwork by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title, artist, type, price, url } = req.body;
    const artwork = new Artwork({ title, artist, type, price, url });
    await artwork.save();

    res.status(201).json(artwork);
  } catch (err) {
    console.error("Error creating artwork:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: "Invalid artwork ID format" });
      return;
    }

    const artwork = await Artwork.findByIdAndDelete(id);
    if (!artwork) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting artwork:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const editArtwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: "Invalid artwork ID format" });
      return;
    }

    const { title, artist, type, price, url, availability } = req.body;
    const artwork = await Artwork.findByIdAndUpdate(
      id,
      { title, artist, type, price, url, availability },
      { new: true }
    );

    if (!artwork) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }

    res.json(artwork);
  } catch (err) {
    console.error("Error updating artwork:", err);
    res.status(500).json({ error: "Server error" });
  }
};
