import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useWrapManifest } from "../hooks/useWrapManifest";
import { usePolywrapClient } from "@polywrap/react";
import Loader from "../components/Loader";
import { useDocsManifest } from "../hooks/useDocsManifest";
import { useParams } from "react-router-dom";
import { Uri } from "@polywrap/client-js";

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
        <Header {...{ wrapUri: "" }} />
        <AppBody>
          <div>Wrap URI is missing.</div>
        </AppBody>
      </>
    );
  }

  try {
    const sanitizedUri = Uri.from(wrapUri).uri;

    return <InnerContainer {...{ wrapUri: sanitizedUri }} />;
  } catch (e) {
    return (
      <>
        <AppBody>
          <div>Wrap URI is malformed!</div>
        </AppBody>
      </>
    );
  }
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
    loading: docsLoading,
  } = useDocsManifest({
    client,
    uri: wrapUri,
  });

  if (loading || docsLoading) {
    return (
      <>
        <Header {...{ wrapUri }} />
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
      <Header {...{ wrapUri }} />
      <AppBody>
        <Sidebar {...{ manifest, docsManifest, wrapUri }} />
        <Body {...{ manifest, docsManifest, wrapUri }} />
      </AppBody>
    </>
  );
}

export default AppContainer;
