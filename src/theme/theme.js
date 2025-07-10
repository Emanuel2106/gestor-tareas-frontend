// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2' // azul MUI
    },
    secondary: {
      main: '#9c27b0' // púrpura MUI
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

export default theme;
