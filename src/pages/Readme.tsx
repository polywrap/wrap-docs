import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack as syntax } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { usePolywrapClient } from "@polywrap/react";
import { useParams } from "react-router-dom";
import { WrapError } from "@polywrap/client-js";
import { DocsManifest } from "@polywrap/polywrap-manifest-types-js";

import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Box } from "@mui/material";

type ReadmeProps = {
  docsManifest?: DocsManifest;
  wrapUri: string;
};

type ReadmeState = {
  loading: boolean;
  error?: WrapError;
  markdown?: string;
};

const INITIAL_README_STATE: ReadmeState = {
  loading: true,
};

function Readme(props: ReadmeProps) {
  const { docsManifest, wrapUri } = props;
  let { slug } = useParams<"slug">();

  const client = usePolywrapClient();
  const [readme, setReadme] = useState(INITIAL_README_STATE);

  if (!slug) {
    slug = props.docsManifest?.homePage;
  }

  useEffect(() => {
    const exec = async () => {
      if (!slug) {
        return;
      }

      if (docsManifest?.pages?.[slug]) {
        const page = docsManifest?.pages?.[slug];

        const pageContentsResult = await client.getFile(wrapUri, {
          path: `docs/${page.path}`,
          encoding: "utf-8",
        });

        if (pageContentsResult.ok) {
          setReadme({
            loading: false,
            markdown: pageContentsResult.value.toString(),
          });
        } else {
          setReadme({ loading: false, error: pageContentsResult.error });
        }
      }
    };

    exec();
  }, [slug, client, docsManifest, wrapUri]);

  if (readme.loading) {
    return <></>;
  } else if (!readme.markdown) {
    return <></>;
  }

  return (
    <Box
      component={ReactMarkdown}
      sx={{
        a: {
          color: "primary.main",
        },
      }}
      remarkPlugins={[remarkExternalLinks]}
      components={{
        code: (props: CodeProps) => {
          const { inline, lang, className, children } = props;
          const language = lang || className?.replace("language-", "") || "";

          return inline ? (
            <code {...props} className={className}>
              {children}
            </code>
          ) : (
            <SyntaxHighlighter language={language} style={syntax} PreTag="div">
              {children as unknown as string[]}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {readme.markdown}
    </Box>
  );
}

export default Readme;
