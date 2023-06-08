import { Button as MuiButton, ButtonProps, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

export default function Button({ children, ...props }: ButtonProps) {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <MuiButton
      {...props}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "fg.900",
        backgroundColor: "iris.900",
        border: `1px solid ${themes[mode].fg[900]}`, // ${theme.palette.fg[100]}
        borderRadius: 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "backgroundColor 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "iris.500",
        },
        "&:active": {
          boxShadow: "none",
        },
      }}
    >
      {children}
    </MuiButton>
  );
}
