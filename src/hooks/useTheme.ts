type BackgroundColorPalette = {
  primary: string;
  secondary: string;
};

type UtilColorPalette = {
  sidebar: string;
  divider: string;
};

type TypographyColorPalette = {
  primary: string;
  secondary: string;
};

type PointColorPalette = {
  disabled: string;
  primary: string;
  secondary: string;
};

type InfoColorPalette = {
  success: string;
  warning: string;
  danger: string;
};

type Theme = {
  palette: {
    background: BackgroundColorPalette;
    util: UtilColorPalette;
    typography: TypographyColorPalette;
    point: PointColorPalette;
    info: InfoColorPalette;
  };
};

export const useTheme = (): Theme => {
  return {
    palette: {
      background: {
        primary: "#121212",
        secondary: "#1c1c1e",
      },
      util: {
        sidebar: "#181818",
        divider: "#2c2c2e",
      },
      typography: {
        primary: "#e0e0e0",
        secondary: "#a0a0a0",
      },
      point: {
        disabled: "#666666",
        primary: "#007aff",
        secondary: "#5ac8fa",
      },
      info: {
        success: "#34c759",
        warning: "#ff9500",
        danger: "#ff3b30",
      },
    },
  };
};
