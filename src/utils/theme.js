import { createTheme, responsiveFontSizes, adaptV4Theme } from '@mui/material';

const darkTheme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#039be5'
    },
    secondary: {
      main: '#f06292'
    }
  },
  typography: {
    fontFamily: [
      'Vazir',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
}));

const rtlDarkTheme = createTheme(adaptV4Theme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#039be5'
    },
    secondary: {
      main: '#f06292'
    }
  },
  typography: {
    fontFamily: [
      'Vazir',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
}))

export const ltrTheme = responsiveFontSizes(darkTheme);
export const rtlTheme = responsiveFontSizes(rtlDarkTheme);
