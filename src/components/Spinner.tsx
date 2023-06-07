import { Box, useTheme } from "@mui/material";
import React from "react";
import { themes } from "../styles/palette";

import "./Spinner.css";

export interface SpinnerProps {
  style?: React.CSSProperties;
}

function Spinner(props: SpinnerProps) {
  const theme = useTheme();
  const { mode } = theme.palette;
  
  return <Box sx={{
    display: "inline-block",
    width: "50px",
    height: "50px",
    border: `3px solid ${themes[mode].bg[900]}40`,
    borderTopColor: `${themes[mode].bg[900]}`,
    borderRadius: "50%",
    animation: "spin 1s ease-in-out infinite",
    WebkitAnimation: "spin 1s ease-in-out infinite"
  }} className="spinner" style={props.style} />;
}

export default Spinner;
