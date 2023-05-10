import { DarkModeOutlined, SearchOutlined } from "@mui/icons-material";
import { Input, Link, Stack, Typography } from "@mui/material";

export const HEADER_HEIGHT = 80;

export default function Header() {
  return (
    <Stack
      direction="row"
      component="header"
      sx={{
        alignItems: "center",
        borderBottom: `1px solid`,
        borderBottomColor: "fg.100",
        color: "fg.900",
        height: HEADER_HEIGHT,
        justifyContent: "space-between",
        px: 3,
      }}
    >
      <Input
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
      />
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Link>docs</Link>
        <Link>support</Link>
        <Link>
          <DarkModeOutlined />
        </Link>
      </Stack>
    </Stack>
  );
}
