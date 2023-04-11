import { HashRouter } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import Sidebar from "./layout/Sidebar";
import Body from "./layout/Body";

import "./styles/globals.css";
import { Box } from "@mui/material";
import ThemeContext from "./context/ThemeProvider";

function App() {
  const defaultConfig = DefaultBundle.getConfig();

  return (
    <ThemeContext>
      <Box className="app">
        <HashRouter>
          <PolywrapProvider {...defaultConfig}>
            <Box sx={{ minHeight: "100vh" }}>
              <Sidebar />
              <Body />
            </Box>
          </PolywrapProvider>
        </HashRouter>
      </Box>
    </ThemeContext>
  );
}

export default App;
