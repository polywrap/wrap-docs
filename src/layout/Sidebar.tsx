import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HEIGHT as HEADER_HEIGHT } from "./Header";
import { examples } from "../constants";
import SidebarSection from "../components/SidebarSection";
import UniswapLogo from "../images/uniswap-logo.svg";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";

const SidebarContainer = styled.nav`
  top: ${HEADER_HEIGHT};
  left: 0;
  position: sticky;
  height: calc(100vh - ${HEADER_HEIGHT});
  flex: 0 0 200px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const LoadingContainer = styled.div`
  width: 100%;
  margin-top: 45px;
  text-align: center;
`;

const LoadingText = styled.div`
  line-height: 3.5em;
`;

const WrapLogo = styled.a`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
`;

const WrapName = styled.h2`
  overflow-wrap: anywhere;
  margin: 0.1rem 0;
  margin-left: 10px;
  margin-right: 5px;
  line-height: 1.25;
  font-weight: 600;
  font-size: 1.375rem;
  text-align: center;
  cursor: pointer;
`;

const WrapType = styled.h5`
  margin: unset;
  text-align: center;
  font-weight: 100;
`;

const SidebarItem = styled.div`
  overflow-wrap: anywhere;
  cursor: pointer;
  font-size: smaller;
  padding-bottom: 5px;
  padding-top: 5px;
  &:hover {
    background: ${(props) => props.theme.colors[300]};
  }
`;

type SidebarPage = {
  title: string;
  path: string;
};

type SidebarProps = {
  manifest: WrapManifest;
  docsManifest?: DocsManifest;
};

function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const { manifest } = props;

  const abi = manifest?.abi;
  const functions = abi?.moduleType?.methods || [];
  const env = abi?.envType;
  const objects = abi?.objectTypes || [];
  const importedObjects = abi?.importedObjectTypes || [];
  const enums = abi?.enumTypes || [];
  const importedEnums = abi?.importedEnumTypes || [];
  const importedModules = abi?.importedModuleTypes || [];

  const readmeLinks: SidebarPage[] = [];
  let wrapHasReadmePages = false;

  if (props.docsManifest?.pages) {
    for (const pageSlug in props.docsManifest.pages) {
      wrapHasReadmePages = true;
      const page = props.docsManifest.pages[pageSlug];
      readmeLinks.push({
        path: pageSlug,
        title: page.title,
      });
    }
  }

  return (
    <SidebarContainer className="sidebar">
      <WrapLogo>
        <img src={UniswapLogo} alt="uniswap-logo" width={100} height={100} />
      </WrapLogo>
      <WrapName onClick={() => navigate("/")}>{manifest.name}</WrapName>
      <WrapType>
        {"[type: "}
        <b>{manifest.type}</b>
        {"]"}
      </WrapType>
      {wrapHasReadmePages ? (
        <SidebarSection name="README" initOpen>
          {readmeLinks.map((x) => (
            <>
              <SidebarItem onClick={() => navigate(`/readme/${x.path}`)}>
                {x.title}
              </SidebarItem>
            </>
          ))}
        </SidebarSection>
      ) : (
        <SidebarSection name="README" onClick={() => navigate("/")} />
      )}
      {examples && (
        <SidebarSection name="Examples" initOpen>
          {examples.map((i) => (
            <SidebarItem onClick={() => navigate("/example/" + i.name)}>
              {i.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {functions.length > 0 && (
        <SidebarSection name="Functions">
          {functions.map((i) => (
            <SidebarItem onClick={() => navigate("/function/" + i.name)}>
              {i.name}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {env && (
        <SidebarSection name="Env">
          {env.properties?.map((i) => (
            <SidebarItem>{i.name}</SidebarItem>
          ))}
        </SidebarSection>
      )}
      {objects.length > 0 && (
        <SidebarSection name="Objects">
          {objects.map((i) => (
            <SidebarItem onClick={() => navigate("/object/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {enums.length > 0 && (
        <SidebarSection name="Enums">
          {enums.map((i) => (
            <SidebarItem onClick={() => navigate("/enum/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedObjects.length > 0 && (
        <SidebarSection name="Import Objects">
          {importedObjects.map((i) => (
            <SidebarItem onClick={() => navigate("/import/object/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedEnums.length > 0 && (
        <SidebarSection name="Import Enums">
          {importedEnums.map((i) => (
            <SidebarItem onClick={() => navigate("/import/enum/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedModules.length > 0 && (
        <SidebarSection name="Import Modules">
          {importedModules.map((i) => (
            <SidebarItem onClick={() => navigate("/import/module/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      <SidebarSection name="Schema" onClick={() => navigate("/schema")} />
    </SidebarContainer>
  );
}

export default Sidebar;
