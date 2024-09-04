import { light } from "@mui/material/styles/createPalette";

export const themeDark = {
  colors: {
    primary: {
      standard: "#291D1D",
      medium: "#3B2929",
      light: "#453131",
    },
    text: {
      standard: "#FAFAFA",
      medium: "#B7B7B7",
      light: "#FAFAFA",
    },
    background: {
      standard: "#2B2B2F",
      medium: "#292929",
      light: "#2B2B2F",
    },
    status: {
      error: "#F7747D",
      success: "#38A538",
      warning: "",
      alert: "#83D4FA",
      errorHover: "#EF646e",
      alertHover: "#B4E5FC",
    },
    base: {
      standard: "#FAFAFA",
    }
  },
  border: {
    radius: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      ul: '50%',
    },    
  },
  boxShadow: {shadow : '1px 1px 5px 2px #CCC'}
}