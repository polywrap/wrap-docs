import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useWrapManifest } from "../hooks/useWrapManifest";
import { usePolywrapClient } from "@polywrap/react";
import { wrapperUri } from "../constants";
import Loader from "../components/Loader";

const AppBody = styled.div`
  width: unset !important;
  padding: unset !important;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

function AppContainer() {
  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: wrapperUri,
  });

  if (loading) {
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
        <Sidebar {...{ manifest }} />
        <Body {...{ manifest }}/>
      </AppBody>
    </>
  );
}

export default AppContainer;
