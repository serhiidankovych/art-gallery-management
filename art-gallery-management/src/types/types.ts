export type ArtworkType = "painting" | "sculpture" | "photography" | "drawing";

export interface Artwork {
  _id?: string;
  title: string;
  artist: string;
  type: ArtworkType;
  price: number;
  availability: boolean;
  url: string;
}
