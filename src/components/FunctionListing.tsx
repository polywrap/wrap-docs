import { MethodDefinition } from "@polywrap/wrap-manifest-types-js";
import { Box, Link, Typography, alpha, useTheme } from "@mui/material";
import { themes } from "../styles/palette";

type FunctionListingProps = {
  methods: MethodDefinition[];
};

function FunctionListing(props: FunctionListingProps) {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { methods } = props;

  return (
    <Box
      sx={{
        bgcolor: themes[mode].iris[900],
        p: 3,
        borderRadius: 2,
        position: "sticky",
        top: 120,
        overflowY: "scroll",
        maxHeight: `calc(100vh - 140px)`,
      }}
    >
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{ fontWeight: 800, mb: 1 }}
      >
        Functions
      </Typography>
      {methods.map((method, i) => {
        return (
          <Link
            key={i}
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
        );
      })}
    </Box>
  );
}

export default FunctionListing;
