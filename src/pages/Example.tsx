import { useParams } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";
import { ExampleStep } from "../types/Example";
import ExampleRunner from "../components/ExampleRunner";
import { useMemo } from "react";
import { Box, Stack } from "@mui/material";

type ExampleProps = {
  examples: DocsManifest["examples"];
  wrapUri: string;
};

function Example(props: ExampleProps) {
  const { examples, wrapUri } = props;
  const client = usePolywrapClient();
  const { slug } = useParams<"slug">();

  const steps = useMemo<ExampleStep[]>(() => {
    if (!examples || !slug) {
      return [];
    }

    const example = examples[slug];

    if (!example || !example.steps?.length) {
      return [];
    }
    const steps: ExampleStep[] = example.steps.map((step) => ({
      uri: step.uri,
      method: step.method,
      args: step.args ?? {},
      description: step.description,
    }));

    return steps;
  }, [slug, examples]);

  if (!examples) {
    return <div>These docs don't contain examples!</div>;
  }

  if (!slug) {
    return <div>Example slug is required!</div>;
  }

  const example = examples[slug];

  if (!example) {
    return <div>Unknown Example slug: {slug}</div>;
  }

  if (!example.steps?.length) {
    return <div>Example requires at least one step!</div>;
  }

  return (
    <Stack
      gap={4}
      sx={{
        pt: 4,
      }}
    >
      <Box component="h1" sx={{
        mt: 0,
        mb: 0
      }}>{example.title}</Box>
      <ExampleRunner {...{ client, steps, wrapUri }} />
    </Stack>
  );
}

export default Example;
