import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

import Readme from "../pages/Readme";
import Schema from "../pages/Schema";
import Example from "../pages/Example";
import FunctionDocs from "../pages/FunctionDocs";
import ObjectDocs from "../pages/ObjectDocs";
import EnumDocs from "../pages/EnumDocs";
import ImportModuleDocs from "../pages/ImportModuleDocs";
import NoMatch from "../pages/NoMatch";

const Main = styled.main`
  padding-bottom: 50px;
  position: relative;
  flex-grow: 1;
  padding: 10px 15px 40px 45px;
  min-width: 0;
  display: block;
`;

type BodyProps = {
  manifest: WrapManifest;
};

function Body(props: BodyProps) {
  const { manifest } = props;

  return (
    <Main>
      <Routes>
        <Route path="/" element={<Readme />} />
        <Route path="/schema" element={<Schema {...{ manifest }} />} />
        <Route path="/example/:id" element={<Example />} />
        <Route path="/function/:id" element={<FunctionDocs {...{ manifest }} />} />
        <Route path="/object/:id" element={<ObjectDocs {...{ manifest }} />} />
        <Route
          path="/import/object/:id"
          element={<ObjectDocs import {...{ manifest }} />}
        />
        <Route path="/enum/:id" element={<EnumDocs {...{ manifest }} />} />
        <Route
          path="/import/enum/:id"
          element={<EnumDocs import {...{ manifest }} />}
        />
        <Route path="/import/module/:id" element={<ImportModuleDocs {...{ manifest }} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Main>
  );
}

export default Body;
