import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import artworkRoutes from "./routes/artwork.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json());

app.use("/artworks", artworkRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
