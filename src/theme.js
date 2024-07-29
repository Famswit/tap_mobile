import { createTheme } from '@mui/material/styles';




export const theme = createTheme({
  palette: {
    primary: {
      main: "#2D75B6",
      button:"#2D75B6",
    
    },
    secondary: {
      main: "#50555E",
    },
    background: {
        main: "#fff",
        nav: "#eeeeee",
    }
  },

  typography: {
    fontFamily: ["BlinkMacSystemFont"].join(','),
    fontSize: 13,
    fontWeight: 600,
    fontStyle: "normal",
    letterSpacing: -0.12,
    marginTop:20,

    h1: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.1,
    },
    h2: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 24,
      fontWeight: 700,
      fontStyle: "normal",
      letterSpacing: -0.1,
    },
    
    h3: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 13,
      fontWeight: 600,
      fontStyle: "normal",
      letterSpacing: '-0.12',
      margin: '2rem 0 .5rem',
      
    },
    h4: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 13,
      fontWeight: 600,
      fontStyle: "normal",
      letterSpacing: '-0.12',     
    },
    h5: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 13,
      fontWeight: 400,
      fontStyle: "normal",
      letterSpacing: '-0.12'
    },
    h6: {
      fontFamily: ["BlinkMacSystemFont"].join(","),
      fontSize: 14,
      fontWeight: 400,
      fontStyle: "normal",
      letterSpacing: '-0.12'
    }
  }
});

