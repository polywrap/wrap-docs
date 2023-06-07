import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { ImportedEnumDefinition } from "@polywrap/wrap-manifest-types-js";

import RenderSchema from "../components/RenderSchema";
import ReferenceSection from "../components/ReferenceSection";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { getTypeRefRoutes } from "../utils/getTypeRefRoutes";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { Box, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

interface EnumDocsProps {
  import?: boolean;
  manifest: WrapManifest;
}

function EnumDocs(props: EnumDocsProps) {
  const navigate = useNavigate();
  const { manifest } = props;

  const { id } = useParams<"id">();

  const theme = useTheme();
  const { mode } = theme.palette;

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return <div>{message}</div>;
  }

  const enums = (props.import ? abi.importedEnumTypes : abi.enumTypes) || [];
  const enumDef = enums.find((enumDef) => enumDef.type === id);

  if (!enumDef) {
    const message = `Unable to find enum "${id}".`;
    console.error(message);
    return <div>{message}</div>;
  }

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(enumDef.type, abi);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="h1"
          sx={{
            fontWeight: 100,
            fontStretch: "expanded",
          }}
        >
          Enum: <b>{enumDef.type}</b>
        </Box>
        <Box
          component="span"
          sx={{
            color: themes[mode].bg[900],
            display: "flex",
            alignItems: "center",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("../schema")}
        >
          <Box
            component="h6"
            sx={{
              fontWeight: 100,
              fontSize: "large",
            }}
          >
            schema
          </Box>
          <UnfoldMore />
        </Box>
      </Box>
      {enumDef.comment && (
        <Box
          component="h2"
          sx={{
            fontWeight: 100,
            fontSize: "large",
          }}
        >
          {enumDef.comment}
        </Box>
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
          <Box component="h3">URI</Box>
          {(enumDef as ImportedEnumDefinition).uri}
        </>
      )}
      <ReferenceSection refRoutes={refRoutes} />
    </>
  );
}

export default EnumDocs;
