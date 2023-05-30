import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { readme } from "../constants/readme";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Box } from "@mui/material";

function Readme() {
  return (
    <Box
      component={ReactMarkdown}
      sx={{
        a: {
          color: "primary.main",
        },
      }}
      remarkPlugins={[remarkExternalLinks]}
      components={{
        code: (props: CodeProps) => {
          const language =
            props.lang || props.className?.replace("language-", "") || "";

          return (
            <SyntaxHighlighter language={language} style={syntax}>
              {props.children as unknown as string[]}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {readme}
    </Box>
  );
}

export default Readme;
