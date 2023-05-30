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
import FunctionListing from "../components/FunctionListing";

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
        <FunctionListing methods={methods} />
      </Grid>
    </Grid>
  );
}

export default FunctionDocs;
