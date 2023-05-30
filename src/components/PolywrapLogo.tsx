import React from "react";
import { themes, protocols } from "../styles/palette";
import { alpha, Box, Button, Stack, Typography, useTheme } from "@mui/material";

interface PolywrapLogoProps {
  height?: number;
  animateBorderWidth?: boolean;
  marginTop?: number;
}

const PolywrapLogo = ({
  height = 32,
  animateBorderWidth = false,
  marginTop = undefined,
  ...props
}: PolywrapLogoProps) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Stack
      component="div"
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        height: height,
        marginTop: marginTop ? `${marginTop}px` : undefined,
        position: "relative",
        ".logotype": {
          color: alpha("#fff", 0.8),
        },
        "&:hover": {
          ".logomark": {
            boxShadow: `2px 1000px 1px ${themes[mode].bg[800]} inset`,
            borderWidth: animateBorderWidth ? 3 : null,
            transform: `rotate(360deg)`,
          },
          ".logotype": {
            color: "#fff",
          },
        },
      }}
      {...props}
    >
      <Box sx={{ height: height, width: height }}>
        <Button
          className="logomark"
          color="primary"
          aria-label="logo Button"
          sx={{
            p: 0,
            minWidth: height,
            position: "absolute",
            height: "100%",
            aspectRatio: "1/1",
            zIndex: 0,
            transition: "cubic-bezier(0.35, 1.5, 0.65, 1)",
            transitionProperty: "all",
            transitionDuration: "1s",
            border: `solid 2px transparent`,
            borderRadius: 999,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(135deg, #05d3fb 0%, #5361f8 14.58%, #d362df 41.15%, #f8ba26 67.19%, #49f128 85.42%, #05d3fb 100%)`,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            boxShadow: `2px 1000px 1px ${themes[mode].bg[1000]} inset`,
          }}
        />
        <svg
          viewBox="0 0 218 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: "100%",
            width: "auto",
            zIndex: 1,
            pointerEvents: "none",
            position: "relative",
          }}
        >
          <path
            d="M32.6398 21.1735C30.214 23.256 26.2695 23.4838 24.1738 20.1532C23.0409 18.1537 23.8322 15.3206 26.1947 13.3563C28.5573 11.3921 32.349 12.4411 33.6608 14.7562C34.9726 17.0713 34.6579 19.4411 32.6398 21.1735Z"
            fill="#fff"
          />
          <path
            d="M20.6398 24.7998C20.6685 24.798 20.6952 24.7982 20.7197 24.8005C21.6889 25.5203 22.7965 25.7609 23.9403 26.0093C25.4127 26.3292 26.9451 26.6621 28.3191 28.0472C30.972 30.7216 28.9017 35.4076 25.6521 37.3173C22.4025 39.227 18.22 38.1408 16.3103 34.8912C14.7693 32.269 15.9253 29.3548 16.6966 27.4104C16.8812 26.9452 17.0437 26.5354 17.142 26.1985C17.1427 26.1986 17.1434 26.1986 17.144 26.1986C17.1633 26.0879 17.2567 25.4939 17.1363 25.027C16.9331 24.2391 16.0891 23.7696 15.1908 23.2699C14.2271 22.7338 13.2009 22.163 12.8367 21.127C12.0727 18.9544 13.5058 16.2913 15.696 16.0146C18.7158 15.6333 20.3802 18.1983 19.8279 20.0663C19.4089 21.4836 19.0322 23.3438 20.6398 24.7998Z"
            fill="#fff"
          />
        </svg>
      </Box>
      <Stack spacing={0.5}>
        <Typography
          variant="h2"
          className="logotype"
          sx={{
            lineHeight: 1,
            fontWeight: 600,
            fontFamily: "Colton Display",
            fontStretch: "expanded",
            fontSize: "1rem",
          }}
        >
          docs.wraps.eth
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: themes[mode].fg[400],
            lineHeight: 1,
            fontWeight: 600,
            fontFamily: "Colton Display",
            fontStretch: "expanded",
            fontSize: "0.75rem",
          }}
        >
          by polywrap
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PolywrapLogo;
