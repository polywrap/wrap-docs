import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

import RenderSchema from "../components/RenderSchema";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { Box, Stack, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

type ImportModuleDocsProps = {
  manifest: WrapManifest;
};

function ImportModuleDocs(props: ImportModuleDocsProps) {
  const navigate = useNavigate();
  const { manifest } = props;
  const { id } = useParams<"id">();

  const theme = useTheme();
  const { mode } = theme.palette;

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
    <Stack
      sx={{
        paddingBottom: 4,
        paddingTop: 4,
        gap: 4
      }}
    >
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
            marginTop: 0,
            marginBottom: 0,
            fontWeight: 100,
            fontStretch: "expanded",
          }}
        >
          Module: <b>{module.type}</b>
        </Box>
        <Box
          component="span"
          sx={{
            color: themes[mode].fg[900],
            display: "flex",
            alignItems: "center",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("../schema")}
        >
          <span>schema</span>
          <UnfoldMore
            sx={{
              color: themes[mode].fg[900],
            }}
          />
        </Box>
      </Box>
      {module?.comment && (
        <Box
          component="h2"
          sx={{
            fontWeight: 100,
            fontSize: "large",
          }}
        >
          {module.comment}
        </Box>
      )}
      <RenderSchema
        importedModules={[module]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
      <Box component="h3" sx={{
        mt: 0,
        mb: 0
      }}>URI</Box> {module.uri}
    </Stack>
  );
}

export default ImportModuleDocs;
