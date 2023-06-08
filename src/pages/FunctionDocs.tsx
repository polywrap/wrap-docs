import { useParams, useNavigate } from "react-router-dom";
import { Launch, UnfoldMore } from "@mui/icons-material";

import RenderSchema from "../components/RenderSchema";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { Box, useTheme } from "@mui/material";

import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";
import { Stack } from "@mui/system";

type ExampleRef = {
  slug: string;
  title: string;
};

type FunctionDocsProps = {
  manifest: WrapManifest;
  docsManifest?: DocsManifest;
};

function FunctionDocs(props: FunctionDocsProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { manifest, docsManifest } = props;
  const { id } = useParams<"id">();

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return <div>{message}</div>;
  }

  const methods = abi.moduleType?.methods || [];
  const method = methods.find((method) => method.name === id);

  if (!method) {
    const message = `Unable to find function "${id}".`;
    console.error(message);
    return <div>{message}</div>;
  }

  // Find any examples including this function
  const exampleRefs: ExampleRef[] = [];

  if (docsManifest?.examples) {
    for (const slug in docsManifest.examples) {
      const example = docsManifest.examples[slug];

      if (example.steps?.some((x) => x.method === method.name)) {
        exampleRefs.push({
          slug: slug,
          title: example.title,
        });
      }
    }
  }

  return (
    <Stack
      sx={{
        pt: 4,
        pb: 4
      }}
      gap={4}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Box
          component="h1"
          sx={{
            mt: 0,
            mb: 0,
          }}
        >
          Function: <b>{method.name}</b>
        </Box>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("../schema")}
        >
          <span>schema</span>
          <UnfoldMore />
        </Stack>
      </Stack>

      {method.comment && method.comment.length && (
        <Box
          sx={{
            fontWeight: 100,
            fontSize: "large",
          }}
        >
          {method.comment}
        </Box>
      )}

      <RenderSchema
        methods={[method]}
        onTypeNameClick={(name) => {
          const route = getTypeNameRoute(name, abi);

          if (route) {
            navigate(route);
          }
        }}
      />
      {method?.arguments?.length && (
        <Box>
          <Box
            component="h3"
            sx={{
              mt: 0,
              mb: 0,
            }}
          >
            Arguments
          </Box>
          <Box
            component={"ul"}
            sx={{
              listStyle: "circle",
              lineHeight: "1.5",
            }}
          >
            {method.arguments.map((argument) => {
              const required = argument.required;
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
                    {argument.name}
                  </Box>
                  {!required && " (optional)"}
                  {" - "}
                  {argument.comment || "no comment."}
                </li>
              );
            })}
          </Box>
        </Box>
      )}
      {exampleRefs.length > 0 && (
        <Box>
          <Box
            component="h3"
            sx={{
              mt: 0,
              mb: 0,
            }}
          >
            Examples
          </Box>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              paddingLeft: 4,
            }}
          >
            {exampleRefs.map((example) => (
              <Box
                component="li"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("../example/" + example.slug)}
              >
                <span style={{ display: "flex" }}>
                  <Launch style={{ paddingRight: "0.5em" }} />
                  {example.title}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
}

export default FunctionDocs;
