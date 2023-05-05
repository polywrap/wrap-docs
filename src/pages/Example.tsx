import { useParams } from "react-router-dom";
import { usePolywrapClient } from "@polywrap/react";

import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";
import { ExampleStep } from "../types/Example";
import { wrapperUri } from "../constants";
import ExampleRunner from "../components/ExampleRunner";
import { useMemo } from "react";

type ExampleProps = {
  examples: DocsManifest["examples"];
};

function parseStepUri(uri: string) {
  if (uri === "$$WRAP_URI") {
    return wrapperUri;
  }

  return uri;
}

function Example(props: ExampleProps) {
  const { examples } = props;
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
      uri: parseStepUri(step.uri),
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
    <>
      <div>{example.title}</div>
      <ExampleRunner {...{ client, steps }} />
    </>
  );
}

export default Example;
