import { useState, useEffect } from "react";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { Artwork, ArtworkType } from "../../types/types";
import ArtCardDialog from "../art/ArtCardDialog";

interface SearchFilterProps {
  data: Artwork[];
  onFilter: (filteredData: Artwork[]) => void;
  setCurrentPage: (page: number) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  data,
  onFilter,
  setCurrentPage,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | boolean
  >("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const [uniqueArtists, setUniqueArtists] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  useEffect(() => {
    setUniqueArtists([...new Set(data.map((artwork) => artwork.artist))]);
    setUniqueTypes([...new Set(data.map((artwork) => artwork.type))]);
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchQuery,
    selectedArtist,
    selectedType,
    selectedAvailability,
    sortOrder,
  ]);

  const applyFilters = () => {
    let result = [...data];

    if (searchQuery) {
      result = result.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedArtist) {
      result = result.filter((artwork) => artwork.artist === selectedArtist);
    }

    if (selectedType) {
      result = result.filter((artwork) => artwork.type === selectedType);
    }

    if (selectedAvailability !== "") {
      result = result.filter(
        (artwork) => artwork.availability === (selectedAvailability === "true")
      );
    }

    if (sortOrder) {
      result = result.sort((a, b) => {
        if (sortOrder === "Low to High") return a.price - b.price;
        if (sortOrder === "High to Low") return b.price - a.price;
        return 0;
      });
    }

    onFilter(result);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedArtist("");
    setSelectedType("");
    setSelectedAvailability("");
    setSortOrder("");
    onFilter(data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
        <div className="flex items-center bg-white rounded-lg shadow-sm">
          <TextField
            value={searchQuery || ""}
            label="Search artworks"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "250px" }}
            InputProps={{
              style: { borderRadius: "8px 0 0 8px" },
            }}
          />
          <IconButton
            onClick={applyFilters}
            sx={{
              backgroundColor: "text.primary",
              color: "white",
              borderRadius: "0 8px 8px 0",
              "&:hover": { backgroundColor: "text.secondary" },
            }}
          >
            <IoSearch />
          </IconButton>
        </div>

        <Select
          value={selectedAvailability || ""}
          displayEmpty
          size="small"
          onChange={(e) => setSelectedAvailability(e.target.value)}
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MenuItem value="">All Availability</MenuItem>
          <MenuItem value="true">Available</MenuItem>
          <MenuItem value="false">Unavailable</MenuItem>
        </Select>

        <Select
          value={selectedArtist || ""}
          displayEmpty
          size="small"
          onChange={(e) => setSelectedArtist(e.target.value)}
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MenuItem value="">All Artists</MenuItem>
          {uniqueArtists.map((artist, index) => (
            <MenuItem key={`artist-${index}`} value={artist || ""}>
              {artist}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedType || ""}
          displayEmpty
          size="small"
          onChange={(e) => setSelectedType(e.target.value)}
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MenuItem value="">All Types</MenuItem>
          {uniqueTypes.map((type, index) => (
            <MenuItem key={`type-${index}`} value={type || ""}>
              {type}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={sortOrder || ""}
          displayEmpty
          size="small"
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MenuItem value="">Sort by Price</MenuItem>
          <MenuItem value="Low to High">Price: Low to High</MenuItem>
          <MenuItem value="High to Low">Price: High to Low</MenuItem>
        </Select>

        <Button
          variant="outlined"
          color="primary"
          onClick={resetFilters}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          Reset
        </Button>
      </div>

      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            minWidth: "150px",
            textTransform: "none",
          }}
        >
          Add Artwork
        </Button>
        <ArtCardDialog
          isEditing={false}
          open={open}
          artwork={{
            title: "",
            artist: "",
            price: 0,
            url: "",
            type: "" as ArtworkType,
            availability: false,
          }}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
