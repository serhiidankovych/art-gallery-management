import express from "express";
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  deleteArtwork,
  editArtwork,
} from "../controllers/artwork.controller";

const router = express.Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
router.post("/", createArtwork);
router.delete("/:id", deleteArtwork);
router.put("/:id", editArtwork);
export default router;
