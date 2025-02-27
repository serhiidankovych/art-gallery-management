import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Artwork } from "../types/types";

const API_URL = "http://localhost:8000/artworks";

export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async () => {
    const response = await axios.get(API_URL);

    return response.data;
  }
);

export const addArtwork = createAsyncThunk(
  "artworks/addArtwork",
  async (newArtwork: Omit<Artwork, "_id">) => {
    const response = await axios.post(API_URL, newArtwork);
    return response.data;
  }
);

export const deleteArtwork = createAsyncThunk(
  "artworks/deleteArtwork",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const editArtwork = createAsyncThunk(
  "artworks/editArtwork",
  async ({ id, updatedArtwork }: { id: string; updatedArtwork: Artwork }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedArtwork);

    return response.data;
  }
);

interface ArtworkState {
  artworks: Artwork[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ArtworkState = {
  artworks: [],
  status: "idle",
};

const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchArtworks.fulfilled,
        (state, action: PayloadAction<Artwork[]>) => {
          state.status = "succeeded";
          state.artworks = action.payload;
        }
      )
      .addCase(fetchArtworks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        addArtwork.fulfilled,
        (state, action: PayloadAction<Artwork>) => {
          state.artworks.push(action.payload);
        }
      )
      .addCase(
        editArtwork.fulfilled,
        (state, action: PayloadAction<Artwork>) => {
          const index = state.artworks.findIndex(
            (art) => art._id === action.payload._id
          );
          if (index !== -1) {
            state.artworks[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteArtwork.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.artworks = state.artworks.filter(
            (art) => art._id !== action.payload
          );
        }
      )
      .addCase(editArtwork.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default artworksSlice.reducer;
