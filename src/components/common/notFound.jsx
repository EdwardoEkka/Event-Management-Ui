
import { Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Typography variant="h3" color="error">
        404
      </Typography>
      <Typography variant="h5">This page does not exist.</Typography>
    </Box>
  );
};

export default NotFound;
