import { UnfoldMore } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { ImportedObjectDefinition } from "@polywrap/wrap-manifest-types-js";

import RenderSchema from "../components/RenderSchema";
import ReferenceSection from "../components/ReferenceSection";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { getTypeRefRoutes } from "../utils/getTypeRefRoutes";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

interface ObjectDocsProps {
  import?: boolean;
  manifest: WrapManifest;
}

function ObjectDocs(props: ObjectDocsProps) {
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

  // Find the object
  const objects =
    (props.import ? abi.importedObjectTypes : abi.objectTypes) || [];
  const object = objects.find((object) => object.type === id);

  if (!object) {
    const message = `Unable to find object "${id}".`;
    console.error(message);
    return <div>{message}</div>;
  }

  // Find all references in other parts of the ABI
  const refRoutes = getTypeRefRoutes(object.type, abi);

  return (
    <Stack
      gap={4}
      sx={{
        pt: 4,
        pb: 4,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2
        }}
      >
        <Box
          component="h1"
          sx={{
            mt: 0,
            mb: 0,
            wordBreak: "break-word",
          }}
        >
          Object: <b>{object.type}</b>
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
      </Stack>

      {object.comment && object.comment.length && (
        <Box
          sx={{
            fontWeight: 100,
            fontSize: "large",
          }}
        >
          {object.comment}
        </Box>
      )}

      <RenderSchema
        objects={[object]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />

      {props.import && (
        <Box>
          <Box
            component="h3"
            sx={{
              mt: 0,
              mb: 0,
            }}
          >
            URI
          </Box>
          {(object as ImportedObjectDefinition).uri}
        </Box>
      )}

      {object?.properties?.length && (
        <Box>
          <Box
            component="h3"
            sx={{
              mt: 0,
              mb: 0,
            }}
          >
            Properties
          </Box>
          <Box
            component="ul"
            sx={{
              listStyle: "circle",
              lineHeight: 1.5,
            }}
          >
            {object.properties.map((property) => {
              const required = property.required;
              return (
                <li>
                  <Box
                    component="span"
                    sx={{
                      fontKerning: "none",
                      letterSpacing: "1px",
                      fontWeight: "bold",
                    }}
                  >
                    {property.name}
                  </Box>
                  {!required && " (optional)"}
                  {property.comment
                    ? ` - ${property.comment}`
                    : " - no comment"}
                </li>
              );
            })}
          </Box>
        </Box>
      )}

      <ReferenceSection refRoutes={refRoutes} />
    </Stack>
  );
}

export default ObjectDocs;
