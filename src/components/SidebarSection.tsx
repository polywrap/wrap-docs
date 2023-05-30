import { Box, Stack } from "@mui/material";
import React from "react";
import ReadmeIcon from "./icons/ReadmeIcon";
import ExamplesIcon from "./icons/ExamplesIcon";
import DependenciesIcon from "./icons/DependenciesIcon";
import EnumsIcon from "./icons/EnumsIcon";
import FunctionsIcon from "./icons/FunctionsIcon";
import ObjectsIcon from "./icons/ObjectsIcon";
import SchemaIcon from "./icons/SchemaIcon";

type Icons =
  | "readme"
  | "examples"
  | "functions"
  | "env"
  | "objects"
  | "enums"
  | "dependencies"
  | "schema";

interface SidebarIconProps {
  type: Icons;
}

interface SidebarSectionProps {
  name: string;
  children?: React.ReactNode;
  initOpen?: boolean;
  slug: Icons;
  onClick?: React.MouseEventHandler;
}

function SectionIcon({ type }: SidebarIconProps) {
  switch (type) {
    case "readme":
      return <ReadmeIcon />;
    case "examples":
      return <ExamplesIcon />;
    case "enums":
      return <EnumsIcon />;
    case "functions":
      return <FunctionsIcon />;
    case "objects":
      return <ObjectsIcon />;
    case "schema":
      return <SchemaIcon />;
    default:
      return <DependenciesIcon />;
  }
}

function SidebarSection(props: SidebarSectionProps) {
  const [open, setOpen] = React.useState(!!props.initOpen);

  return (
    <Stack
      spacing={1}
      direction="row"
      onClick={props.onClick}
      sx={{
        alignItems: "center",
        borderRadius: 1,
        cursor: "pointer",
        fontWeight: 600,
        py: 1,
        px: 2,
        "&:hover": {
          bgcolor: "fg.50",
        },
      }}
    >
      <SectionIcon type={props.slug} />
      <Box>{props.name}</Box>
    </Stack>
  );
  // if (!props.children) {
  // } else {
  //   return (
  //     <Box>
  //       <SectionHeading
  //         onClick={(e) => {
  //           setOpen(!open);
  //           if (props.onClick) {
  //             props.onClick(e);
  //           }
  //         }}
  //       >
  //         {(open ? "- " : "+ ") + props.name}
  //       </SectionHeading>
  //       {open && props.children}
  //     </Box>
  //   );
  // }
}

export default SidebarSection;
