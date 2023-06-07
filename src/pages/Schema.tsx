import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import RenderSchema from "../components/RenderSchema";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { Box, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

type SchemaProps = {
  manifest: WrapManifest;
};

function Schema(props: SchemaProps) {
  const navigate = useNavigate();
  const { manifest } = props;
  const [withComments, setWithComments] = React.useState(false);

  const theme = useTheme();
  const { mode } = theme.palette;

  const abi = manifest.abi;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "cneter",
          justifyContent: "end",
        }}
      >
        <Dropdown inner={<Settings />}>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              zIndex: 1,
              backgroundColor: themes[mode].fg[50],
              borderRadius: "5px",
              overflow: "hidden",
              padding: "5px 0px",
            }}
          >
            <Toggle
              style={{ height: "32px" }}
              initValue={withComments}
              onToggle={(toggle) => setWithComments(toggle)}
              position={"right"}
            >
              Comments
            </Toggle>
          </Box>
        </Dropdown>
      </Box>
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
