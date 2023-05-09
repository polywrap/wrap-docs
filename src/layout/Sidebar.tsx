import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HEIGHT as HEADER_HEIGHT } from "./Header";
import defaultWrapLogo from "../images/default-wrap-logo.svg";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";
import { useEffect, useState } from "react";
import { usePolywrapClient } from "@polywrap/react";
import SidebarSection from "../components/SidebarSection";

const SidebarContainer = styled.nav`
  top: ${HEADER_HEIGHT};
  left: 0;
  position: sticky;
  height: calc(100vh - ${HEADER_HEIGHT});
  flex: 0 0 200px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const WrapLogo = styled.a`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
  cursor: pointer;
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

type ReadmePage = {
  title: string;
  path: string;
};

type ExamplePage = {
  title: string;
  path: string;
};

type SidebarProps = {
  manifest: WrapManifest;
  docsManifest?: DocsManifest;
  wrapUri: string;
};

function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const { manifest, wrapUri } = props;
  const client = usePolywrapClient();

  const abi = manifest?.abi;
  const functions = abi?.moduleType?.methods || [];
  const env = abi?.envType;
  const objects = abi?.objectTypes || [];
  const importedObjects = abi?.importedObjectTypes || [];
  const enums = abi?.enumTypes || [];
  const importedEnums = abi?.importedEnumTypes || [];
  const importedModules = abi?.importedModuleTypes || [];

  const readmes: ReadmePage[] = [];
  const examples: ExamplePage[] = [];
  let wrapHasReadmePages = false;
  let wrapHasExamples = false;

  // Wrap logo
  const [wrapLogoUrl, setWrapLogoUrl] = useState(defaultWrapLogo);
  useEffect(() => {
    if (props.docsManifest?.logo) {
      const logoPath = props.docsManifest.logo;
      const exec = async () => {
        const logoResult = await client.getFile(wrapUri, {
          path: `docs/${logoPath}`,
        });
        if (logoResult.ok) {
          setWrapLogoUrl(URL.createObjectURL(new Blob([logoResult.value])));
        } else {
          setWrapLogoUrl(defaultWrapLogo);
        }
      };
      exec();
    } else {
      setWrapLogoUrl(defaultWrapLogo);
    }
  }, [props.docsManifest?.logo, client, wrapUri]);

  if (props.docsManifest?.pages) {
    for (const pageSlug in props.docsManifest.pages) {
      wrapHasReadmePages = true;

      const page = props.docsManifest.pages[pageSlug];

      readmes.push({
        path: pageSlug,
        title: page.title,
      });
    }
  }

  if (props.docsManifest?.examples) {
    for (const exampleSlug in props.docsManifest.examples) {
      wrapHasExamples = true;

      const example = props.docsManifest.examples[exampleSlug];

      examples.push({
        path: exampleSlug,
        title: example.title,
      });
    }
  }

  return (
    <SidebarContainer className="sidebar">
      <WrapLogo onClick={() => navigate("")}>
        <img src={wrapLogoUrl} alt="Wrap logo" width={100} height={100} />
      </WrapLogo>
      <WrapName onClick={() => navigate("")}>{manifest.name}</WrapName>
      <WrapType>
        {"[type: "}
        <b>{manifest.type}</b>
        {"]"}
      </WrapType>
      {wrapHasReadmePages ? (
        <SidebarSection name="README" initOpen>
          {readmes.map((x) => (
            <>
              <SidebarItem onClick={() => navigate(`readme/${x.path}`)}>
                {x.title}
              </SidebarItem>
            </>
          ))}
        </SidebarSection>
      ) : (
        <SidebarSection name="README" onClick={() => navigate("")} />
      )}
      {wrapHasExamples && (
        <SidebarSection name="Examples" initOpen>
          {examples.map((i) => (
            <SidebarItem onClick={() => navigate("example/" + i.path)}>
              {i.title}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {functions.length > 0 && (
        <SidebarSection name="Functions">
          {functions.map((i) => (
            <SidebarItem onClick={() => navigate("function/" + i.name)}>
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
            <SidebarItem onClick={() => navigate("object/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {enums.length > 0 && (
        <SidebarSection name="Enums">
          {enums.map((i) => (
            <SidebarItem onClick={() => navigate("enum/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedObjects.length > 0 && (
        <SidebarSection name="Import Objects">
          {importedObjects.map((i) => (
            <SidebarItem onClick={() => navigate("import/object/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedEnums.length > 0 && (
        <SidebarSection name="Import Enums">
          {importedEnums.map((i) => (
            <SidebarItem onClick={() => navigate("import/enum/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      {importedModules.length > 0 && (
        <SidebarSection name="Import Modules">
          {importedModules.map((i) => (
            <SidebarItem onClick={() => navigate("import/module/" + i.type)}>
              {i.type}
            </SidebarItem>
          ))}
        </SidebarSection>
      )}
      <SidebarSection name="Schema" onClick={() => navigate("schema")} />
    </SidebarContainer>
  );
}

export default Sidebar;
