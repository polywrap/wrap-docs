import {
  Box,
  BoxProps,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import defaultWrapLogo from "../images/default-wrap-logo.svg";
import { WrapManifest } from "@polywrap/wrap-manifest-types-js";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";
import { themes } from "../styles/palette";
import { useEffect, useState } from "react";
import { usePolywrapClient } from "@polywrap/react";
import SidebarSection from "../components/SidebarSection";
import { ContentCopy, OpenInNew } from "@mui/icons-material";
import PolywrapLogo from "../components/PolywrapLogo";

export const SIDEBAR_WIDTH = "400px";

const SidebarContainer = ({ children }: BoxProps) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box
      sx={{
        left: 0,
        position: "fixed",
        zIndex: 40,
        width: SIDEBAR_WIDTH,
        height: "100%",
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "overlay",
        borderRight: `1px solid`,
        borderColor: `fg.100`,
        "::-webkit-scrollbar-thumb": {
          bgcolor: themes[mode].fg[50],
        },
      }}
    >
      {children}
    </Box>
  );
};

const SidebarItem = ({ children, ...props }: BoxProps) => (
  <Box
    {...props}
    sx={{
      cursor: "pointer",
      fontSize: "smaller",
      paddingBottom: "5px",
      paddingTop: "5px",
      "&:hover": {
        bgcolor: "bg.300",
      },
    }}
  >
    {children}
  </Box>
);

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

export default function Sidebar(props: SidebarProps) {
  const theme = useTheme();
  const { mode } = theme.palette;
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
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: 80,
          pl: 2,
          width: "100%",
        }}
      >
        <PolywrapLogo />
      </Box>

      <Paper
        sx={{
          p: 2,
          m: 2,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              borderRadius: "999px",
              display: "inlineFlex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 40,
              height: 40,
              cursor: "pointer",
            }}
            onClick={() => navigate("")}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={wrapLogoUrl}
              alt="wrap logo"
            />
          </Box>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography
              variant="h2"
              onClick={() => navigate("")}
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                fontFamily: "Colton Display",
                fontStretch: "expanded",
                fontSize: "1.375rem",
                margin: 0,
                cursor: "pointer",
              }}
            >
              {manifest.name}
            </Typography>
            <Link
              href={"uniswap.org"}
              target="_blank"
              rel="noredirect"
              underline="none"
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  color: "fg.500",
                  fontWeight: "100",
                  fontSize: "10px",
                  "&:hover": {
                    color: "fg.1000",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: 1,
                    transform: "translateY(-5%)",
                  }}
                >
                  {"uniswap.org"}
                </Typography>
                <OpenInNew sx={{ width: 12, height: 12 }} />
              </Stack>
            </Link>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          sx={{
            py: 3,
            borderBottom: `1px solid ${themes[mode].fg[50]}`,
            borderTop: `1px solid ${themes[mode].fg[50]}`,
            mt: 3,
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
              URI
            </Typography>
            <Stack spacing={1} direction="row">
              <Typography
                sx={{ color: "fg.1000", fontWeight: 500, fontSize: 12 }}
              >
                {wrapUri}
              </Typography>
              <ContentCopy sx={{ width: 12 }} />
            </Stack>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
              Type
            </Typography>
            <Typography
              sx={{ color: "fg.1000", fontWeight: 500, fontSize: 12 }}
            >
              {manifest.type}
            </Typography>
          </Stack>

          {importedModules.length > 0 && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
                Dependencies
              </Typography>
              <Typography
                sx={{ color: "fg.1000", fontWeight: 500, fontSize: 12 }}
              >
                {importedModules.length}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack>
          {wrapHasReadmePages ? (
            <SidebarSection name="README" initOpen>
              {readmes.map((x) => (
                <>
                  <SidebarItem
                    key={x.path}
                    onClick={() => navigate(`readme/${x.path}`)}
                  >
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
                <SidebarItem
                  key={i.path}
                  onClick={() => navigate("example/" + i.path)}
                >
                  {i.title}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          {functions.length > 0 && (
            <SidebarSection name="Functions">
              {functions.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("function/" + i.name)}
                >
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
              {objects.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("object/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          {enums.length > 0 && (
            <SidebarSection name="Enums">
              {enums.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("enum/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          {importedObjects.length > 0 && (
            <SidebarSection name="Import Objects">
              {importedObjects.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("import/object/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          {importedEnums.length > 0 && (
            <SidebarSection name="Import Enums">
              {importedEnums.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("import/enum/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          {importedModules.length > 0 && (
            <SidebarSection name="Import Modules">
              {importedModules.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("import/module/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}

          <SidebarSection name="Schema" onClick={() => navigate("schema")} />
        </Stack>
      </Paper>
    </SidebarContainer>
  );
}
