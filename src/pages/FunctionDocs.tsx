import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Launch, UnfoldMore } from "@mui/icons-material";
import { usePolywrapClient } from "@polywrap/react";

import { useWrapManifest } from "../hooks/useWrapManifest";
import { uniswapV3Uri, examples } from "../constants";
import RenderSchema from "../components/RenderSchema";
import Loader from "../components/Loader";
import { getTypeNameRoute } from "../utils/getTypeNameRoute";
import { Box, Grid, Link, Typography, alpha, useTheme } from "@mui/material";
import FunctionSection from "../components/FunctionSection";
import { themes } from "../styles/palette";

function FunctionDocs() {
  const navigate = useNavigate();
  const client = usePolywrapClient();
  const { manifest, error, loading } = useWrapManifest({
    client,
    uri: uniswapV3Uri,
  });
  const { id } = useParams<"id">();

  const theme = useTheme();
  const { mode } = theme.palette;

  if (loading) {
    return <Loader style={{ width: "100%", marginTop: "45px" }} />;
  } else if (error) {
    console.error(error);
    return <div>{error.toString()}</div>;
  }

  // Find the function
  const abi = manifest?.abi;

  if (!abi) {
    const message = `ABI not found.`;
    console.error(message);
    return <div>{message}</div>;
  }

  const methods = abi.moduleType?.methods || [];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        {methods.map((method, i) => {
          return (
            <FunctionSection {...method} args={method.arguments} index={i} />
          );
        })}
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ bgcolor: themes[mode].iris[900], p: 3, borderRadius: 2 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: 800, mb: 1 }}
          >
            Functions
          </Typography>
          {methods.map((method, i) => {
            return (
              <Box key={i}>
                <Link
                  href={`#/functions#${method.name}`}
                  underline="none"
                  sx={{
                    borderLeft: `1px solid transparent`,
                    display: "block",
                    px: 1,
                    py: 0.5,
                    width: "100%",
                    "&:hover": {
                      borderColor: themes[mode].iris[500],
                      bgcolor: alpha("#fff", 0.05),
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ color: alpha("#fff", 0.7), fontSize: 12 }}
                  >
                    {method.name}
                  </Typography>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default FunctionDocs;
