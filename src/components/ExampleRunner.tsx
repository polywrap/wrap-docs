import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlayArrow } from "@mui/icons-material";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";

import ExampleStepRunner from "./ExampleStepRunner";
import { ExampleStep } from "../types/Example";
import {
  parseStringWithStepResultReferences,
  replaceWrapUriToken,
  resolveStepResultReferenceValues,
} from "../utils/exampleRunnerUtils";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DocsLink = styled.span`
  color: ${(props) => props.theme.colors[50]};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const DocsText = styled.h6`
  color: ${(props) => props.theme.colors[50]};
  font-weight: 100;
`;

const Title = styled.h1`
  font-weight: 300;
`;

const Description = styled.h2`
  font-weight: 300;
  font-size: large;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const SettingsMenu = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: grid;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors[900]};
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0px;
  background-color: ${(props) => props.theme.colors[50]}3b;
`;

const RunArrow = styled(PlayArrow)`
  height: 15px !important;
  width: 15px !important;
`;

const SnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 0.25rem;
  width: auto;
`;

const SnippetText = styled.div`
  margin-top: 1rem;
  max-height: 50vh;
  font-size: 0.9rem;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.colors[50]};
  border-radius: 5px;
`;

const ErrorTitle = styled.h3`
  font-weight: 400;
  text-align: left;
`;

const ErrorContainer = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
`;

const ErrorText = styled.div`
  margin-top: 1rem;
  max-height: 50vh;
  font-size: 0.9rem;
  overflow: auto;
  border: 1px solid red;
  border-radius: 5px;
`;

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

  const getInitialState = (): ExampleStepWithResult[] => {
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
  };
  const [exampleStepsWithResults, setExampleStepsWithResults] = useState<
    ExampleStepWithResult[]
  >(getInitialState());

  // Reset component when steps change
  useEffect(() => {
    setExampleStepsWithResults(getInitialState());
  }, [steps]);

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
