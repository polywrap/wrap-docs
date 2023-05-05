import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PlayArrow, Settings, ManageSearch } from "@mui/icons-material";
import { InvokeResult, PolywrapClient } from "@polywrap/client-js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Loader from "./Loader";
import Spinner from "./Spinner";
import Button from "./Button";
import Toggle from "./Toggle";
import Dropdown from "./Dropdown";
import MultiSelect from "./MultiSelect";
import { getInvokeSnippet } from "../utils/getInvokeSnippet";
import { InvokeLanguage, invokeLanguages } from "../utils/InvokeLanguage";
import ExampleStepRunner from "./ExampleStepRunner";
import { Example, ExampleStep } from "../types/Example";

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
  example: ExampleStep;
  result?: InvokeResult;
};

function ExampleRunner(props: {
  steps: ExampleStep[];
  client: PolywrapClient;
}) {
  const { steps, client } = props;
  const [lastResult, setLastResult] = useState<InvokeResult | undefined>(
    undefined
  );
  const firstStep = steps[0];

  const getInitialState = () => {
    return [
      {
        example: {
          args: firstStep.args,
          description: firstStep.description,
          method: firstStep.method,
          uri: firstStep.uri,
        },
      },
    ];
  };
  const [examplesWithResults, setExamplesWithResults] = useState<
    ExampleStepWithResult[]
  >(getInitialState());

  // Reset component when steps change
  useEffect(() => {
    setLastResult(undefined);
    setExamplesWithResults(getInitialState());
  }, [steps]);

  const onExampleResult = (result: InvokeResult, index: number) => {
    setLastResult(result);

    if (result.ok) {
      const ewr = [...examplesWithResults];
      ewr[index].result = result;

      const results = ewr.map(
        (x) => x.result ?? ({ ok: false } as InvokeResult)
      );

      // If this is the latest result and is not the last one expected
      if (index === ewr.length - 1 && index < steps.length - 1) {
        ewr.push({
          example: {
            args: steps[index + 1].args,
            description: steps[index + 1].description,
            method: steps[index + 1].method,
            uri: steps[index + 1].uri,
          },
        });
      } else {
        console.log("Nope");
      }

      setExamplesWithResults(ewr);
    }
  };

  return (
    <>
      {examplesWithResults.map((ewr, ewrIndex) => (
        <ExampleStepRunner
          key={ewrIndex}
          client={client}
          step={ewr.example}
          onResult={(result) => {
            onExampleResult(result, ewrIndex);
          }}
        />
      ))}
    </>
  );
}

export default ExampleRunner;
