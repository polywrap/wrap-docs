import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Share as RefLink } from "@mui/icons-material";

import { PropName, TypeName } from "../components/RenderSchema";
import { TypeRefRoutes } from "../utils/getTypeRefRoutes";
import { Box, Stack } from "@mui/material";

interface ReferenceSectionProps {
  refRoutes: TypeRefRoutes;
}

const ReferenceList = styled.ul`
  list-style: none;
  padding-left: 16px;
`;

const ReferenceListItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export function ReferenceSection(props: ReferenceSectionProps) {
  const navigate = useNavigate();
  const { refRoutes } = props;

  return (
    <Stack gap={2}>
      {(refRoutes.functionArgs.length > 0 ||
        refRoutes.functionRets.length > 0 ||
        refRoutes.objects.length > 0) && (
        <>
          <Box
            component="h3"
            sx={{
              mt: 0,
              mb: 0,
            }}
          >
            References
          </Box>
          {refRoutes.functionArgs.length > 0 && (
            <Box>
              <Box
                component="h4"
                sx={{
                  mt: 0,
                  mb: 0,
                }}
              >
                Function Arg
              </Box>
              <ReferenceList>
                {refRoutes.functionArgs.map((nameRoute) => (
                  <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
                    <span style={{ display: "flex" }}>
                      <RefLink style={{ paddingRight: "0.5em" }} />
                      <PropName>{nameRoute.name}</PropName>
                    </span>
                  </ReferenceListItem>
                ))}
              </ReferenceList>
            </Box>
          )}
          {refRoutes.functionRets.length > 0 && (
            <Box>
              <Box
                component="h4"
                sx={{
                  mt: 0,
                  mb: 0,
                }}
              >
                Function Result
              </Box>
              <ReferenceList>
                {refRoutes.functionRets.map((nameRoute) => (
                  <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
                    <span style={{ display: "flex" }}>
                      <RefLink style={{ paddingRight: "0.5em" }} />
                      <PropName>{nameRoute.name}</PropName>
                    </span>
                  </ReferenceListItem>
                ))}
              </ReferenceList>
            </Box>
          )}
          {refRoutes.objects.length > 0 && (
            <Box>
              <Box
                component="h4"
                sx={{
                  mt: 0,
                  mb: 0,
                }}
              >
                Object Property
              </Box>
              <ReferenceList>
                {refRoutes.objects.map((nameRoute) => (
                  <ReferenceListItem onClick={() => navigate(nameRoute.route)}>
                    <span style={{ display: "flex" }}>
                      <RefLink style={{ paddingRight: "0.5em" }} />
                      <TypeName>{nameRoute.name}</TypeName>
                    </span>
                  </ReferenceListItem>
                ))}
              </ReferenceList>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
}

export default ReferenceSection;
