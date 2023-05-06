import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useWrapManifest } from "../hooks/useWrapManifest";
import { usePolywrapClient } from "@polywrap/react";
import { wrapperUri } from "../constants";
import Loader from "../components/Loader";
import { useDocsManifest } from "../hooks/useDocsManifest";
import { Route, Routes, useParams } from "react-router-dom";

const AppBody = styled.div`
  width: unset !important;
  padding: unset !important;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

function AppContainer() {
  const { wrapUri } = useParams<"wrapUri">();

  if (!wrapUri) {
    return (
      <>
        <Header />
        <AppBody>
          <div>Wrap URI is missing.</div>
        </AppBody>
      </>
    );
  }

  return <InnerContainer {...{ wrapUri }} />;
}

type InnerContainerProps = {
  wrapUri: string;
};

function InnerContainer(props: InnerContainerProps) {
  const { wrapUri } = props;
  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrapUri,
  });

  const {
    manifest: docsManifest,
    error: docsError,
    loading: docsLoading,
  } = useDocsManifest({
    client,
    uri: wrapUri,
  });

  if (loading || docsLoading) {
    return (
      <>
        <Header />
        <AppBody>
          <Loader></Loader>
        </AppBody>
      </>
    );
  } else if (error) {
    return <></>;
  } else if (!manifest) {
    return <></>;
  }

  return (
    <>
      <Header />
      <AppBody>
        <Sidebar {...{ manifest, docsManifest, wrapUri }} />
        <Body {...{ manifest, docsManifest }} />
      </AppBody>
    </>
  );
}

export default AppContainer;
