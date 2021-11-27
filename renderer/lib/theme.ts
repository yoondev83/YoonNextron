import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: "#fff",
    },
    secondary: {
      // main: '#19857b',
      main: '#444',

    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#75B3D6',
    },
  },
  typography: {
    fontFamily: "TMONBlack",
    subtitle1: {
      fontFamily: "TMONTium",
      fontSize: 14,
    }
  },

});
