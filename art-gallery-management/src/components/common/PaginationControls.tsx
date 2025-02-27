import { Stack, Pagination } from "@mui/material";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" marginY={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationControls;
