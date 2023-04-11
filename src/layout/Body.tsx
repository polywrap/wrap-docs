import { Routes, Route } from "react-router-dom";

import Readme from "../pages/Readme";
import Schema from "../pages/Schema";
import Example from "../pages/Example";
import FunctionDocs from "../pages/FunctionDocs";
import ObjectDocs from "../pages/ObjectDocs";
import EnumDocs from "../pages/EnumDocs";
import ImportModuleDocs from "../pages/ImportModuleDocs";
import NoMatch from "../pages/NoMatch";
import { Box } from "@mui/material";
import Header from "./Header";
import { SIDEBAR_WIDTH } from "./Sidebar";

function Body() {
  return (
    <Box sx={{ ml: SIDEBAR_WIDTH }}>
      <Header />
      <Box
        component="main"
        sx={{ position: "relative", px: [4, 6, 8], pt: 14 }}
      >
        <Routes>
          <Route path="/" element={<Readme />} />
          <Route path="/schema" element={<Schema />} />
          <Route path="/example/:id" element={<Example />} />
          <Route path="/function/:id" element={<FunctionDocs />} />
          <Route path="/object/:id" element={<ObjectDocs />} />
          <Route path="/import/object/:id" element={<ObjectDocs import />} />
          <Route path="/enum/:id" element={<EnumDocs />} />
          <Route path="/import/enum/:id" element={<EnumDocs import />} />
          <Route path="/import/module/:id" element={<ImportModuleDocs />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Body;
