import { Box, Link, Stack, Typography, alpha, useTheme } from "@mui/material";
import {
  MethodDefinition,
  PropertyDefinition,
} from "@polywrap/wrap-manifest-types-js";
import { themes } from "../styles/palette";
import FunctionPreview from "./FunctionPreview";

interface FunctionSectionProps extends MethodDefinition {
  args?: PropertyDefinition[];
}

export default function FunctionSection({
  args,
  ...props
}: FunctionSectionProps) {
  const { name, comment } = props;

  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box id={name}>
      <Stack direction="row" spacing={1}>
        <Typography
          variant="h4"
          component="h2"
          className="function"
          sx={{
            color: themes[mode].fg[900],
            transition: `color 0.25s ease-in-out`,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          className="hash"
          sx={{
            color: themes[mode].iris[800],
            transition: `color 0.25s ease-in-out`,
          }}
        >
          #
        </Typography>
      </Stack>
      {comment && (
        <Typography sx={{ color: themes[mode].fg[700], mt: 4 }}>
          {comment}
        </Typography>
      )}
      <FunctionPreview {...props} args={args} />
      {args && args.length > 0 && (
        <>
          <Typography variant="h6" component="h3" sx={{ mt: 4 }}>
            Arguments
          </Typography>
          {args.map((argument) => {
            return (
              <Box
                sx={{
                  mt: 3,
                  pl: 2,
                  borderLeft: `1px solid ${themes[mode].iris[500]}`,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Typography sx={{ fontWeight: 900 }}>
                    {argument.name}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    {!argument.required && (
                      <Typography sx={{ color: "fg.500", fontSize: 10 }}>
                        optional
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        color: themes[mode].green,
                        fontFamily: "monospace",
                      }}
                    >
                      {argument.type}
                      {argument.required && (
                        <Typography
                          color="#fff"
                          component="span"
                          fontFamily="monospace"
                        >
                          !
                        </Typography>
                      )}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography sx={{ color: themes[mode].fg[500], mt: 1 }}>
                  {argument.comment}
                </Typography>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
}
