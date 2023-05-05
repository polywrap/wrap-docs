import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ManageSearch, PlayArrow, Settings } from "@mui/icons-material";
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
import { ExampleStep } from "../types/Example";

const Description = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  white-space: pre-wrap;
`;

const Spacer = styled.div`
  margin: 1rem;
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
  max-height: 50vh;
  font-size: 0.9rem;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.colors[50]};
  border-radius: 5px;
`;

const ResultTitle = styled.h3`
  font-weight: 400;
  text-align: left;
  margin-bottom: 0rem;
`;

const ResultContainer = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
`;

const ResultText = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
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

const DropdownWithDocsLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
function ExampleStepRunner(props: {
  step: ExampleStep;
  client: PolywrapClient;
  onResult?: (result: InvokeResult) => void;
}) {
  const navigate = useNavigate();
  const [result, setResult] = React.useState<InvokeResult<unknown>>();
  const [waiting, setWaiting] = React.useState(false);
  const [inspectArgs, setInspectArgs] = React.useState(true);
  const [codegen, setCodegen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<InvokeLanguage>("TypeScript");

  const { description, uri, method, args } = props.step;
  const client = props.client;
  const onResult = props.onResult;

  // We need to reset the internal result when the step being rendered changes
  useEffect(() => {
    setResult(undefined);
  }, [props.step]);

  const invokeSnippet = getInvokeSnippet(
    uri,
    "module",
    method,
    args,
    selectedLanguage,
    inspectArgs,
    codegen
  );

  const run = async () => {
    setWaiting(true);
    const invokeResult = await client.invoke({
      uri,
      method,
      args,
    });
    setResult(invokeResult);
    setWaiting(false);
    onResult && onResult(invokeResult);
  };

  const toggleStyle: React.CSSProperties = {
    height: "32px",
    width: "fit-content",
    justifySelf: "end",
    marginBottom: "5px",
  };

  return (
    <>
      <Header></Header>
      <Description>{description}</Description>
      <SnippetContainer>
        <Controls>
          <Button
            style={{
              height: "28px",
              marginLeft: "10px",
            }}
            disabled={waiting}
            onClick={run}
          >
            <text
              style={{
                marginRight: "5px",
              }}
            >
              Run
            </text>
            {waiting ? (
              <Spinner
                style={{
                  height: "9px",
                  width: "9px",
                }}
              />
            ) : (
              <RunArrow />
            )}
          </Button>
          <DropdownWithDocsLink>
            <Dropdown inner={<Settings />}>
              <SettingsMenu>
                <Toggle
                  style={toggleStyle}
                  position={"right"}
                  initValue={inspectArgs}
                  onToggle={(toggle) => setInspectArgs(toggle)}
                >
                  Args
                </Toggle>
                <Toggle
                  style={toggleStyle}
                  position={"right"}
                  initValue={codegen}
                  onToggle={(toggle) => setCodegen(toggle)}
                >
                  Codegen
                </Toggle>
                <MultiSelect
                  title={selectedLanguage}
                  options={invokeLanguages.flat()}
                  onOptionSelect={(option) =>
                    setSelectedLanguage(option as InvokeLanguage)
                  }
                  position={"right"}
                />
              </SettingsMenu>
            </Dropdown>
            <DocsLink onClick={() => navigate("/function/" + method)}>
              <DocsText>docs</DocsText>
              <ManageSearch />
            </DocsLink>
          </DropdownWithDocsLink>
        </Controls>
        <SnippetText>
          <SyntaxHighlighter
            showLineNumbers={false}
            language={selectedLanguage.toLowerCase()}
            style={syntax}
          >
            {invokeSnippet}
          </SyntaxHighlighter>
        </SnippetText>
      </SnippetContainer>
      {(waiting || result !== undefined) && (
        <>
          {waiting ? (
            <>
              <Spacer />
              <Loader />
            </>
          ) : result?.ok ? (
            <>
              <ResultTitle>Result</ResultTitle>
              <ResultContainer>
                <ResultText>
                  <SyntaxHighlighter
                    showLineNumbers={false}
                    language="json"
                    style={syntax}
                  >
                    {JSON.stringify(result, null, 2).replace(
                      /"([^"]+)":/g,
                      "$1:"
                    )}
                  </SyntaxHighlighter>
                </ResultText>
              </ResultContainer>
            </>
          ) : (
            <>
              <ResultTitle>Error</ResultTitle>
              <ErrorContainer>
                <ErrorText>
                  <SyntaxHighlighter
                    showLineNumbers={false}
                    language="json"
                    style={syntax}
                  >
                    {JSON.stringify(result, null, 2).replace(
                      /"([^"]+)":/g,
                      "$1:"
                    )}
                  </SyntaxHighlighter>
                </ErrorText>
              </ErrorContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ExampleStepRunner;
