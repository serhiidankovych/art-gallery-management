import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArtCard from "./components/ArtCard";
import SearchFilter from "./components/SearchFilter";
import { Container, Pagination, Stack, Typography } from "@mui/material";
import { Artwork } from "./types/types";
import { data } from "./data/data";

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(data);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredArtworks]);

  const handleDeleteArtwork = (id: string) => {
    const updatedArtworks = artworks.filter((art) => art.id !== id);
    setArtworks(updatedArtworks);
    setFilteredArtworks(updatedArtworks);
  };

  const handleEditArtwork = (updatedArtwork: Artwork, id: string) => {
    const updatedArtworks = artworks.map((art) =>
      art.id === id ? { ...updatedArtwork, id } : art
    );

    setArtworks(updatedArtworks);
    setFilteredArtworks(updatedArtworks);
  };

  const handleAddArtwork = (newArtwork: Artwork) => {
    const uniqueArtwork = { ...newArtwork, id: crypto.randomUUID() };
    const updatedArtworks = [...artworks, uniqueArtwork];

    setArtworks(updatedArtworks);
    setFilteredArtworks(updatedArtworks);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArtworks = filteredArtworks.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          p={0}
          m={4}
          gutterBottom
        >
          Explore our collection
        </Typography>

        <div className="flex flex-col lg:flex-col-reverse gap-2">
          <SearchFilter
            data={artworks}
            onFilter={setFilteredArtworks}
            onAdd={handleAddArtwork}
            onDelete={handleDeleteArtwork}
            onEdit={handleEditArtwork}
          />
          <div>
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                {currentArtworks.map((artwork) => (
                  <ArtCard
                    key={artwork.id}
                    artwork={artwork}
                    onDelete={handleDeleteArtwork}
                    onEdit={handleEditArtwork}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Typography variant="h6" color="textSecondary">
                  No artworks found
                </Typography>
              </div>
            )}

            {filteredArtworks.length > 0 && (
              <Stack spacing={2} alignItems="center" marginY={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
