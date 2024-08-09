export interface Theme {
  colors: {
    primary: Colors;
    text: Colors;
    background: Colors;
    status: StatusColors;
  };
  border: {
    radius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      ul: string;
    };
  };
  boxShadow: {
    shadow: string;
  };
}

export interface Colors {
  standard: string;
  medium: string;
  light: string;
}

export interface StatusColors {
  error: string;
  success: string;
  warning: string;
  alert: string;
  errorHover: string;
  alertHover: string;
}