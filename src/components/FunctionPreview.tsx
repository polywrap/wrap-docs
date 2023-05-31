import { Box, Typography, useTheme } from "@mui/material";
import {
  MethodDefinition,
  PropertyDefinition,
} from "@polywrap/wrap-manifest-types-js";
import { themes } from "../styles/palette";

interface FunctionPreviewProps extends MethodDefinition {
  args?: PropertyDefinition[];
}

export default function FunctionPreview({
  args,
  ...props
}: FunctionPreviewProps) {
  const { name } = props;

  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box sx={{ bgcolor: themes[mode].iris[900], p: 2, borderRadius: 2, mt: 4 }}>
      <Box>
        <Typography component="span" fontFamily="monospace" color="info.main">
          {name}
        </Typography>
        <Typography component="span" fontFamily="monospace" color="white">
          (
        </Typography>
      </Box>
      {args?.map((argument, i) => {
        return (
          <Box sx={{ pl: "20px" }}>
            <Typography component="span" fontFamily="monospace" color="fg.500">
              {argument.name}:{" "}
            </Typography>
            <Typography
              component="span"
              fontFamily="monospace"
              color={themes[mode].green}
            >
              {argument.type}
            </Typography>
            {argument.required && (
              <Typography
                component="span"
                fontFamily="monospace"
                color="fg.1000"
              >
                !
              </Typography>
            )}
          </Box>
        );
      })}
      <Box>
        <Typography component="span" fontFamily="monospace" color="fg.1000">
          ):
        </Typography>
        {props.return && (
          <>
            <Typography
              component="span"
              fontFamily="monospace"
              color={themes[mode].green}
            >
              {" "}
              {props.return.type}
            </Typography>
            {props.return.required && (
              <Typography
                component="span"
                fontFamily="monospace"
                color="fg.1000"
              >
                !
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
