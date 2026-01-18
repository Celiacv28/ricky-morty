// components/common/Pagination.tsx
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 2,
        mt: 4,
        mb: 2
      }}
    >
      <Button
        variant="outlined"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        startIcon={<ArrowBack />}
        sx={{ minWidth: 120 }}
      >
        Anterior
      </Button>

      <Typography 
        variant="body1" 
        sx={{ fontWeight: 'medium', mx: 2, minWidth: 120, textAlign: 'center' }}
      >
        Página {currentPage} de {totalPages}
      </Typography>

      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        endIcon={<ArrowForward />}
        sx={{ minWidth: 120 }}
      >
        Siguiente
      </Button>
    </Box>
  );
};
