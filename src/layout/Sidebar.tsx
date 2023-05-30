import {
  Box,
  BoxProps,
  Link,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";
import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri, examples } from "../constants";
import Loader from "../components/Loader";
import SidebarSection from "../components/SidebarSection";
import { themes, protocols } from "../styles/palette";
import UniswapLogo from "../images/uniswap-logo.svg";
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

export default function Sidebar() {
  const theme = useTheme();
  const { mode } = theme.palette;

  const navigate = useNavigate();

  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: uniswapV3Uri,
  });

  if (loading) {
    return (
      <SidebarContainer className="sidebar">
        <Box
          sx={{
            width: "100%",
            marginTop: "45px",
            textAlign: "center",
          }}
        >
          <Loader />
          <Box lineHeight={"3.5em"}>Loading Wrap...</Box>
        </Box>
      </SidebarContainer>
    );
  } else if (error) {
    // TODO: send user to resolution error page
    console.error(error);
    return (
      <SidebarContainer className="sidebar">
        <div>ERROR</div>
      </SidebarContainer>
    );
  } else if (!manifest) {
    // This should never happen
    console.error(
      "This should never happen, manifest & error are both undefined."
    );
    return (
      <SidebarContainer className="sidebar">
        <div>ERROR</div>
      </SidebarContainer>
    );
  }

  const abi = manifest?.abi;
  const functions = abi?.moduleType?.methods || [];
  const env = abi?.envType;
  const objects = abi?.objectTypes || [];
  const importedObjects = abi?.importedObjectTypes || [];
  const enums = abi?.enumTypes || [];
  const importedEnums = abi?.importedEnumTypes || [];
  const importedModules = abi?.importedModuleTypes || [];

  return (
    <SidebarContainer>
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
          <Link
            sx={{
              borderRadius: "999px",
              display: "inlineFlex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 40,
              height: 40,
              backgroundColor: protocols.uniswap,
            }}
          >
            <img src={UniswapLogo} alt="uniswap-logo" width={24} height={24} />
          </Link>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Typography
              variant="h2"
              onClick={() => navigate("/")}
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
          {uniswapV3Uri && (
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
                URI
              </Typography>
              <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                <Typography
                  sx={{ color: "fg.1000", fontWeight: 500, fontSize: 12 }}
                >
                  {uniswapV3Uri}
                </Typography>
                <ContentCopy sx={{ width: 12 }} />
              </Stack>
            </Stack>
          )}
          {manifest.type && (
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
                Type
              </Typography>
              <Typography
                sx={{
                  color: "fg.1000",
                  fontWeight: 500,
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                {manifest.type}
              </Typography>
            </Stack>
          )}
          {importedModules.length > 0 && (
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography sx={{ color: "text.disabled", fontSize: 12 }}>
                Dependencies
              </Typography>
              <Typography
                sx={{
                  color: "fg.1000",
                  fontWeight: 500,
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                {importedModules.length}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack spacing={1} sx={{ mt: 3 }}>
          <SidebarSection
            name="README"
            slug="readme"
            onClick={() => navigate("/")}
          />
          {examples && (
            <SidebarSection name="Examples" slug="examples" initOpen>
              {examples.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/example/" + i.name)}
                >
                  {i.name}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          {functions.length > 0 && (
            <SidebarSection
              name="Functions"
              slug="functions"
              onClick={() => navigate("/functions")}
            />
            // <SidebarSection name="Functions" slug="functions">
            //   {functions.map((i, index) => (
            //     <SidebarItem
            //       key={index}
            //       onClick={() => navigate("/functions/")}
            //     >
            //       {i.name}
            //     </SidebarItem>
            //   ))}
            // </SidebarSection>
          )}
          {env && (
            <SidebarSection name="Env" slug="env">
              {env.properties?.map((i, index) => (
                <SidebarItem key={index}>{i.name}</SidebarItem>
              ))}
            </SidebarSection>
          )}
          {objects.length > 0 && (
            <SidebarSection name="Objects" slug="objects">
              {objects.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/object/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          {enums.length > 0 && (
            <SidebarSection name="Enums" slug="enums">
              {enums.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/enum/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          {importedObjects.length > 0 && (
            <SidebarSection name="Import Objects" slug="dependencies">
              {importedObjects.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/import/object/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          {importedEnums.length > 0 && (
            <SidebarSection name="Import Enums" slug="dependencies">
              {importedEnums.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/import/enum/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          {importedModules.length > 0 && (
            <SidebarSection name="Import Modules" slug="dependencies">
              {importedModules.map((i, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => navigate("/import/module/" + i.type)}
                >
                  {i.type}
                </SidebarItem>
              ))}
            </SidebarSection>
          )}
          <SidebarSection
            name="Schema"
            slug="schema"
            onClick={() => navigate("/schema")}
          />
        </Stack>
      </Paper>
    </SidebarContainer>
  );
}
