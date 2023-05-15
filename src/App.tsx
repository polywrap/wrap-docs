import { HashRouter, Route, Routes } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import AppContainer from "./layout/AppContainer";

import { Box } from "@mui/material";
import ThemeContext from "./context/ThemeProvider";

import "./styles/globals.css";
import Home from "./pages/Home";

function App() {
  const defaultConfig = DefaultBundle.getConfig();

  return (
    <ThemeContext>
      <Box className="app">
        <HashRouter>
          <PolywrapProvider {...defaultConfig}>
            <Box sx={{ minHeight: "100vh" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wrap/:wrapUri/*" element={<AppContainer />} />
              </Routes>
            </Box>
          </PolywrapProvider>
        </HashRouter>
      </Box>
    </ThemeContext>
  );
}

export default App;
