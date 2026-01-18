import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px'
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};
