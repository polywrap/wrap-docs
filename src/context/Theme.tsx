import { components } from "../styles/components";
import { themes } from "../styles/palette";
import "../styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

interface ThemeWrapper {
  children: any;
}

export default function ThemeWrapper({ children }: ThemeWrapper) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const ThemeContext = createContext({ toggleTheme: () => {} });

  const colorMode = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...components,
        palette: {
          mode,
          ...themes[mode],
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
