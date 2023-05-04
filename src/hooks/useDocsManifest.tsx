import React from "react";
import {
  DocsManifest,
  deserializeDocsManifest,
} from "@polywrap/polywrap-manifest-types-js";
import { PolywrapClient, WrapError } from "@polywrap/client-js";

import { useStateReducer } from "./useStateReducer";

export interface UseDocsManifestState {
  manifest?: DocsManifest;
  error?: WrapError;
  loading: boolean;
}

export const INITIAL_INVOKE_STATE: UseDocsManifestState = {
  manifest: undefined,
  error: undefined,
  loading: true,
};

export interface UseDocsManifestProps {
  client: PolywrapClient;
  uri: string;
}

export function useDocsManifest(
  props: UseDocsManifestProps
): UseDocsManifestState {
  const client = props.client;

  // Initialize the UseDocsManifestState
  const { state, dispatch } =
    useStateReducer<UseDocsManifestState>(INITIAL_INVOKE_STATE);

  React.useEffect(() => {
    const execute = async () => {
      dispatch({ loading: true });
      const docsManifestResult = await client.getFile(props.uri, {
        path: "docs/polywrap.docs.json",
        encoding: "utf-8",
      });

      if (docsManifestResult.ok) {
        const docsManifestString = docsManifestResult.value.toString();

        dispatch({
          manifest: deserializeDocsManifest(docsManifestString),
          loading: false,
        });
      } else {
        dispatch({ error: docsManifestResult.error, loading: false });
      }

      return docsManifestResult;
    };

    execute();
  }, []);

  return state;
}
