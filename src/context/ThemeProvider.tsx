import { styles } from "../styles";
import { components } from "../styles/components";
import { themes } from "../styles/palette";
import "../styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useMemo, useState } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
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
        ...styles,
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
