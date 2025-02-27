import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useAppDispatch } from "./hooks/useTypedDispatch.ts";
import Header from "./components/common/Header.tsx";
import Footer from "./components/common/Footer.tsx";
import ArtworkList from "./components/art/ArtworkList.tsx";
import PaginationControls from "./components/common/PaginationControls.tsx";
import SearchFilter from "./components/search/SearchFilter.tsx";
import { Container, Typography } from "@mui/material";
import { Artwork } from "./types/types";
import { fetchArtworks } from "./slices/artworksSlice.ts";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { artworks, status } = useSelector(
    (state: RootState) => state.artworks
  );
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch]);

  useEffect(() => {
    if (artworks && artworks.length > 0) {
      setFilteredArtworks(artworks);
      setCurrentPage(1);
    }
  }, [artworks]);

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
          align="left"
          color="text.primary"
          mt={6}
          gutterBottom
        >
          Explore our collection
        </Typography>

        <div className="flex flex-col gap-2">
          <SearchFilter
            data={artworks}
            onFilter={setFilteredArtworks}
            setCurrentPage={setCurrentPage}
          />
          <ArtworkList artworks={currentArtworks} status={status} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
