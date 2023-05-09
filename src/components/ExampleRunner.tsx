import { useCallback, useEffect, useState } from "react";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";

import ExampleStepRunner from "./ExampleStepRunner";
import { ExampleStep } from "../types/Example";
import {
  parseStringWithStepResultReferences,
  replaceWrapUriToken,
  resolveStepResultReferenceValues,
} from "../utils/exampleRunnerUtils";

type ExampleStepWithResult = {
  step: ExampleStep;
  result?: InvokeResult;
};

function ExampleRunner(props: {
  steps: ExampleStep[];
  client: PolywrapClient;
  wrapUri: string;
}) {
  const { steps, client, wrapUri } = props;
  const firstStep = steps[0];

  const getInitialState = useCallback((): ExampleStepWithResult[] => {
    return [
      {
        step: {
          args: firstStep.args,
          description: parseStringWithStepResultReferences(
            firstStep.description ?? "",
            [],
            0,
            wrapUri
          ),
          method: firstStep.method,
          uri: replaceWrapUriToken(firstStep.uri, wrapUri),
        },
      },
    ];
  }, [firstStep, wrapUri]);

  const [exampleStepsWithResults, setExampleStepsWithResults] = useState<
    ExampleStepWithResult[]
  >(getInitialState());

  // Reset component when steps change
  useEffect(() => {
    setExampleStepsWithResults(getInitialState());
  }, [steps, getInitialState]);
  
  const onExampleResult = (result: InvokeResult, index: number) => {
    if (result.ok) {
      const ewr = [...exampleStepsWithResults];
      ewr[index].result = result;

      // If this is the latest result and is not the last one expected
      if (index === ewr.length - 1 && index < steps.length - 1) {
        const exampleResults = ewr.map((x) => x.result);
        ewr.push({
          step: {
            args: resolveStepResultReferenceValues(
              exampleResults,
              index + 1,
              steps[index + 1].args
            ) as Record<string, unknown>,
            description: parseStringWithStepResultReferences(
              steps[index + 1].description ?? "",
              exampleResults,
              index + 1,
              wrapUri
            ),
            method: steps[index + 1].method,
            uri: parseStringWithStepResultReferences(
              steps[index + 1].uri,
              exampleResults,
              index + 1,
              wrapUri
            ),
          },
        });
      }

      setExampleStepsWithResults(ewr);
    }
  };

  return (
    <>
      {exampleStepsWithResults.map((ewr, ewrIndex) => (
        <ExampleStepRunner
          key={ewrIndex}
          client={client}
          step={ewr.step}
          onResult={(result) => {
            onExampleResult(result, ewrIndex);
          }}
        />
      ))}
    </>
  );
}

export default ExampleRunner;
