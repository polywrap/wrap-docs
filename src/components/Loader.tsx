import React from "react";

import "./Loader.css";
import { Box } from "@mui/material";

interface LoaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  rectStyle?: React.CSSProperties;
}

function Loader(props: LoaderProps) {
  return (
    /* CREDIT: https://tobiasahlin.com/spinkit/ */
    <div className="loader" {...props}>
      <Box className="rect1" sx={{ bgcolor: props.rectStyle || "fg.50" }} />
      <Box className="rect2" sx={{ bgcolor: props.rectStyle || "fg.50" }} />
      <Box className="rect3" sx={{ bgcolor: props.rectStyle || "fg.50" }} />
      <Box className="rect4" sx={{ bgcolor: props.rectStyle || "fg.50" }} />
      <Box className="rect5" sx={{ bgcolor: props.rectStyle || "fg.50" }} />
    </div>
  );
}

export default Loader;
