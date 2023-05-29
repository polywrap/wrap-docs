import { Box, Link, Stack, Typography, useTheme } from "@mui/material";
import RenderSchema from "../components/RenderSchema";
import {
  MethodDefinition,
  PropertyDefinition,
} from "@polywrap/wrap-manifest-types-js";
import { themes } from "../styles/palette";

interface FunctionSectionProps extends MethodDefinition {
  args?: PropertyDefinition[];
  index: number;
}

export default function FunctionSection({
  name,
  comment,
  args,
  index,
}: FunctionSectionProps) {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box sx={{ pt: index === 0 ? 0 : 12 }} id={name}>
      <Stack direction="row" spacing={1}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ color: themes[mode].fg[1000] }}
        >
          {name}
        </Typography>
        <Link href={`#/functions#${name}`} underline="none">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: themes[mode].iris[800],
              transition: `color 0.25s ease-in-out`,
              "&:hover": { color: themes[mode].iris[500] },
            }}
          >
            #
          </Typography>
        </Link>
      </Stack>
      {comment && (
        <Typography sx={{ color: themes[mode].fg[700], mt: 4 }}>
          {comment}
        </Typography>
      )}
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
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ fontWeight: 900 }}>
                    {argument.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: themes[mode].green,
                      fontFamily: "monospace",
                    }}
                  >
                    {argument.type}
                  </Typography>
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
