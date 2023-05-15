import { Button as MuiButton, ButtonProps } from "@mui/material";

export default function Button({ children, ...props }: ButtonProps) {
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
        color: "bg.50",
        backgroundColor: "iris.900",
        border: `1px solid red`, // ${theme.palette.fg[100]}
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
