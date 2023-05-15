import { PaletteOptions } from "@mui/material";

interface FullPalette {
  "1000": string,
  "900": string,
  "800": string,
  "700": string,
  "600": string,
  "500": string,
  "400": string,
  "300": string,
  "200": string,
  "100": string,
  "50": string
}

export interface Colors extends PaletteOptions {
  bg: FullPalette;
  fg: FullPalette;
  green: string;
  magenta: string;
  cyan: string;
  yellow: string;
  iris: FullPalette;
}

const blacks: FullPalette = {
  50: "#06071A0D",
  100: "#06071A1A",
  200: "#06071A33",
  300: "#06071A4D",
  400: "#06071A66",
  500: "#06071A80",
  600: "#06071A99",
  700: "#06071AB3",
  800: "#06071ACC",
  900: "#06071AE6",
  1000: "#06071A",
}

const whites: FullPalette = {
  50: "#F9F9F90D",
  100: "#F9F9F91A",
  200: "#F9F9F933",
  300: "#F9F9F94D",
  400: "#F9F9F966",
  500: "#F9F9F980",
  600: "#F9F9F999",
  700: "#F9F9F9B3",
  800: "#F9F9F9CC",
  900: "#F9F9F9DD",
  1000: "#F9F9F9",
}

const iris: FullPalette = {
  50: "#5361f80d",
  100: "#5361f81a",
  200: "#5361f833",
  300: "#5361f84d",
  400: "#5361f866",
  500: "#5361f8",
  600: "#343aa0",
  700: "#192763",
  800: "#222454",
  900: "#161839",
  1000: "#06071A",
}

const sharedPalette: PaletteOptions = {
  primary: {
    main: iris[500],
    light: `${iris[300]}cc`,
    dark: `${iris[700]}cc`,
  },
  warning: {
    main: "#F8BA26",
    light: "#F8BA26aa",
  },
  info: {
    main: "#05D3FB",
    light: "#05D3FBaa",
  },
  success: {
    main: "#89EB5B",
    light: "#89EB5Baa",
  },
}

const dark: Colors = {
  ...sharedPalette,
  bg: iris,
  fg: whites,
  iris: iris,
  green: "#89EB5B",
  cyan: "#05D3FB",
  magenta: "#D362DF",
  yellow: "#F8BA26",
  background: {
    paper: iris[100],
    default: iris[1000],
  },
  text: {
    primary: whites[900],
    secondary: whites[600],
    disabled: whites[400],
  }
}

const light: Colors = {
  ...sharedPalette,
  iris: iris,
  bg: whites,
  fg: blacks,
  green: "#5DCC29",
  cyan: "#01BEE2",
  magenta: "#D362DF",
  yellow: "#F8BA26",
  background: {
    paper: iris[100],
    default: whites[1000],
  },
  text: {
    primary: blacks[900],
    secondary: blacks[600],
    disabled: blacks[400],
  }
}

export const themes = {
  dark: dark,
  light: light
} 