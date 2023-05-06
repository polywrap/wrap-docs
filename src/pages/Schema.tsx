import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import RenderSchema from "../components/RenderSchema";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
`;

const SettingsMenu = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: ${props => props.theme.colors[900]};
  border-radius: 5px;
  overflow: hidden;
  padding: 5px 0px;
`;

type SchemaProps = {
  manifest: WrapManifest;
};

function Schema(props: SchemaProps) {
  const navigate = useNavigate();
  const { manifest } = props;
  const [withComments, setWithComments] = React.useState(false);

  const abi = manifest.abi;

  return (
    <>
    <Header>
      <Dropdown
        inner={(
          <Settings />
        )}
      >
        <SettingsMenu>
          <Toggle
            style={{ height: "32px" }}
            initValue={withComments}
            onToggle={(toggle) => setWithComments(toggle)}
            position={"right"}
          >
            Comments
          </Toggle>
        </SettingsMenu>
      </Dropdown>
    </Header>
    <RenderSchema
      withModuleType
      withComments={withComments}
      methods={abi.moduleType?.methods}
      objects={abi.objectTypes}
      enums={abi.enumTypes}
      importedObjects={abi.importedObjectTypes}
      importedEnums={abi.importedEnumTypes}
      importedModules={abi.importedModuleTypes}
      onTypeNameClick={(name) => {
        const route = getTypeNameRoute(name, abi);

        if (route) {
          navigate(route);
        }
      }}
      onFuncNameClick={(name) => {
        navigate("../function/" + name);
      }}
    />
    </>
  );
}

export default Schema;
