import { Box, BoxProps } from "@mui/material";
import React from "react";

interface SidebarSectionProps {
  name: string;
  children?: React.ReactNode;
  initOpen?: boolean;
  onClick?: React.MouseEventHandler;
}

const SectionHeading = ({ children, ...props }: BoxProps) => (
  <Box
    sx={{
      borderRadius: 1,
      cursor: "pointer",
      fontWeight: 600,
      py: 1,
      px: 2,
      "&:hover": {
        bgcolor: "fg.50",
      },
    }}
    {...props}
  >
    {children}
  </Box>
);

function SidebarSection(props: SidebarSectionProps) {
  const [open, setOpen] = React.useState(!!props.initOpen);

  if (!props.children) {
    return (
      <Box>
        <SectionHeading onClick={props.onClick}>{props.name}</SectionHeading>
      </Box>
    );
  } else {
    return (
      <Box>
        <SectionHeading
          onClick={(e) => {
            setOpen(!open);
            if (props.onClick) {
              props.onClick(e);
            }
          }}
        >
          {(open ? "- " : "+ ") + props.name}
        </SectionHeading>
        {open && props.children}
      </Box>
    );
  }
}

export default SidebarSection;
