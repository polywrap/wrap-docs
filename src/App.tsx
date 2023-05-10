import styled from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DefaultBundle } from "@polywrap/client-js";
import { PolywrapProvider } from "@polywrap/react";

import ThemeProvider from "./context/ThemeProvider";
import AppContainer from "./layout/AppContainer";

import "./styles/globals.css";
import Home from "./pages/Home";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors[900]};
  color: ${(props) => props.theme.colors[50]};
  position: relative;
  min-height: 100%;
`;

const AppDiv = styled.div`
  max-width: 1200px;
  margin: auto;
  border-left: ${(props) => props.theme.colors[50]};
  border-left-style: solid;
  border-left-width: 1px;
  border-right: ${(props) => props.theme.colors[50]};
  border-right-style: solid;
  border-right-width: 1px;
`;

function App() {
  // Get the default client config
  const defaultConfig = DefaultBundle.getConfig();

  return (
    <ThemeProvider>
      <Root>
        <HashRouter>
          <AppDiv className="app">
            <PolywrapProvider {...defaultConfig}>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route path="/wrap/:wrapUri/*" element={<AppContainer />} />
              </Routes>
            </PolywrapProvider>
          </AppDiv>
        </HashRouter>
      </Root>
    </ThemeProvider>
  );
}

export default App;
