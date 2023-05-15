import styled from "styled-components";
import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

import RenderSchema from "../components/RenderSchema";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 100;
  font-stretch: expanded;
`;

const SchemaLink = styled.span`
  color: ${(props) => props.theme.colors.bg[50]};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SchemaText = styled.h6`
  color: ${(props) => props.theme.colors.bg[50]};
  font-weight: 100;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

const SectionTitle = styled.h3``;

type ImportModuleDocsProps = {
  manifest: WrapManifest;
};

function ImportModuleDocs(props: ImportModuleDocsProps) {
  const navigate = useNavigate();
  const { manifest } = props;
  const { id } = useParams<"id">();

  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return <div>{message}</div>;
  }

  // Find the module
  const importedModules = abi.importedModuleTypes || [];
  const module = importedModules.find((module) => module.type === id);

  if (!module) {
    const message = `Unable to find module "${id}".`;
    console.error(message);
    return <div>{message}</div>;
  }

  return (
    <>
      <Header>
        <Title>
          Module: <b>{module.type}</b>
        </Title>
        <SchemaLink
          onClick={() => navigate("../schema")}
        >
          <SchemaText>schema</SchemaText>
          <UnfoldMore />
        </SchemaLink>
      </Header>
      {module?.comment && <Description>{module.comment}</Description>}
      <RenderSchema
        importedModules={[module]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
      <SectionTitle>URI</SectionTitle>
      {module.uri}
    </>
  );
}

export default ImportModuleDocs;
