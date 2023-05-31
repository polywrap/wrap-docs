import { Routes, Route } from "react-router-dom";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

import Readme from "../pages/Readme";
import Schema from "../pages/Schema";
import Example from "../pages/Example";
import FunctionDocs from "../pages/FunctionDocs";
import ObjectDocs from "../pages/ObjectDocs";
import EnumDocs from "../pages/EnumDocs";
import ImportModuleDocs from "../pages/ImportModuleDocs";
import NoMatch from "../pages/NoMatch";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";

import { Box } from "@mui/material";
import { SIDEBAR_WIDTH } from "./Sidebar";
import Header from "./Header";

type BodyProps = {
  manifest: WrapManifest;
  docsManifest?: DocsManifest;
  wrapUri: string;
};

function Body(props: BodyProps) {
  const { manifest, docsManifest, wrapUri } = props;

  return (
    <>
      <Box sx={{ ml: SIDEBAR_WIDTH, flexGrow: "1" }}>
        <Header />
        <Box
          component="main"
          sx={{ position: "relative", px: [4, 6, 8] }}
        >
          <Routes>
            <Route
              path="/"
              element={<Readme {...{ docsManifest, wrapUri }} />}
            />
            <Route
              path="/readme/:slug"
              element={<Readme {...{ docsManifest, wrapUri }} />}
            />
            <Route path="/schema" element={<Schema {...{ manifest }} />} />
            <Route
              path="/example/:slug"
              element={
                <Example {...{ examples: docsManifest?.examples, wrapUri }} />
              }
            />
            <Route
              path="/function/:id"
              element={<FunctionDocs {...{ manifest, docsManifest }} />}
            />
            <Route
              path="/object/:id"
              element={<ObjectDocs {...{ manifest }} />}
            />
            <Route
              path="/import/object/:id"
              element={<ObjectDocs import {...{ manifest }} />}
            />
            <Route path="/enum/:id" element={<EnumDocs {...{ manifest }} />} />
            <Route
              path="/import/enum/:id"
              element={<EnumDocs import {...{ manifest }} />}
            />
            <Route
              path="/import/module/:id"
              element={<ImportModuleDocs {...{ manifest }} />}
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default Body;
