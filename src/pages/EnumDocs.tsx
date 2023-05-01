import styled from "styled-components";
import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { ImportedEnumDefinition } from "@polywrap/wrap-manifest-types-js";

import RenderSchema from "../components/RenderSchema";
import ReferenceSection from "../components/ReferenceSection";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { getTypeRefRoutes } from "../utils/getTypeRefRoutes";
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

const SectionTitle = styled.h3``;

const SchemaLink = styled.span`
  color: ${props => props.theme.colors[50]};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SchemaText = styled.h6`
  color: ${props => props.theme.colors[50]};
  font-weight: 100;
`;

const Description = styled.h2`
  font-weight: 100;
  font-size: large;
`;

interface EnumDocsProps {
  import?: boolean;
  manifest: WrapManifest
}

function EnumDocs(props: EnumDocsProps) {
  const navigate = useNavigate();
  const { manifest } = props;

  const { id } = useParams<"id">();

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return (<div>{message}</div>);
  }

  const enums = (
    props.import ?
    abi.importedEnumTypes :
    abi.enumTypes
  ) || [];
  const enumDef = enums.find((enumDef) => enumDef.type === id);

  if (!enumDef) {
    const message = `Unable to find enum "${id}".`;
    console.error(message);
    return (<div>{message}</div>);
  }

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(enumDef.type, abi);

  return (
    <>
      <Header>
        <Title>
          Enum: <b>{enumDef.type}</b>
        </Title>
        <SchemaLink
          onClick={() => navigate("/schema")}
        >
          <SchemaText>schema</SchemaText>
          <UnfoldMore />
        </SchemaLink>
      </Header>
      {enumDef?.comment && (
        <Description>
          {enumDef.comment}
        </Description>
      )}
      <RenderSchema
        enums={[enumDef]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
      {props.import && (
        <>
          <SectionTitle>
          URI
          </SectionTitle>
          {(enumDef as ImportedEnumDefinition).uri}
        </>
      )}
      <ReferenceSection refRoutes={refRoutes} />
    </>
  );
}

export default EnumDocs;
