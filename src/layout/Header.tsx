import { DarkModeOutlined, SearchOutlined } from "@mui/icons-material";
import { Input, Link, Stack, Typography, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

export const HEADER_HEIGHT = 80;

export default function Header() {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Stack
      direction="row"
      component="header"
      sx={{
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "bg.1000",
        borderBottom: `1px solid`,
        borderBottomColor: "fg.100",
        color: "fg.900",
        height: HEADER_HEIGHT,
        px: 3,
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      {/* <Input
        disableUnderline
        startAdornment={
          <SearchOutlined
            sx={{ color: "fg.500", width: 16, height: 16, mr: 1 }}
          />
        }
        endAdornment={
          <Typography sx={{ color: "fg.300", fontSize: 12 }}>⌘K</Typography>
        }
        placeholder="Find something..."
        sx={{
          borderRadius: 999,
          border: `1px solid`,
          borderColor: "fg.300",
          color: "fg.500",
          fontSize: 12,
          lineHeight: 1,
          px: 2,
          py: 0.25,
          maxWidth: 350,
          width: "100%",
        }}
      /> */}
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Link
          sx={{
            color: themes[mode].fg[900],
          }}
          href="https://docs.polywrap.io"
        >
          Docs
        </Link>
        <Link
          sx={{
            color: themes[mode].fg[900],
          }}
          href="https://discord.polywrap.io"
        >
          Support
        </Link>
      </Stack>
    </Stack>
  );
}
