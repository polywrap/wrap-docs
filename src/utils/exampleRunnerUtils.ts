import { InvokeResult } from "@polywrap/client-js";

function _isReference(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("$");
}

function _isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function _followAccessors(
  stepResult: InvokeResult | undefined,
  accessors: string[],
  stepId: number
): unknown {
  let val = stepResult as unknown;
  for (const [i, accessor] of accessors.entries()) {
    const indexable = val as Record<string, unknown>;
    if (!(accessor in indexable)) {
      const currentRef = accessors.slice(0, i).join(".");
      throw new Error(
        `Could not resolve arguments: Property ${accessor} not found in ${currentRef} for step with index ${stepId}`
      );
    }
    val = indexable[accessor];
  }
  return val;
}

function _resolveReference(
  stepResults: (InvokeResult | undefined)[],
  referencePath: string
): unknown {
  const accessorsWithStepIdx = referencePath
    .slice(1, referencePath.length)
    .split(".");
  const stepIdx = Number.parseInt(accessorsWithStepIdx[0]);
  const accessors = accessorsWithStepIdx.slice(1, accessorsWithStepIdx.length);

  // follow accessors through reference output to get requested data
  return _followAccessors(stepResults[stepIdx], accessors, stepIdx);
}

function _resolveRecord(
  stepResults: (InvokeResult | undefined)[],
  stepId: number,
  record: Record<string, unknown>
): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    resolved[key] = resolveStepResultReferenceValues(
      stepResults,
      stepId,
      value
    );
  }
  return resolved;
}

function _resolveArray(
  stepResults: (InvokeResult | undefined)[],
  stepId: number,
  array: Array<unknown>
): Array<unknown> {
  return array.map((v) =>
    resolveStepResultReferenceValues(stepResults, stepId, v)
  );
}

export function resolveStepResultReferenceValues(
  stepResults: (InvokeResult | undefined)[],
  stepIdx: number,
  value: unknown
): unknown {
  if (_isReference(value)) {
    return _resolveReference(stepResults, value);
  } else if (Array.isArray(value)) {
    return _resolveArray(stepResults, stepIdx, value);
  } else if (_isRecord(value)) {
    return _resolveRecord(stepResults, stepIdx, value);
  } else {
    return value;
  }
}

export function replaceWrapUriToken(str: string, wrapUri: string): string {
  const wrapUriRegex = /\$\$WRAP_URI/g;
  return str.replaceAll(wrapUriRegex, wrapUri);
}

export function parseStringWithStepResultReferences(
  str: string,
  stepResults: (InvokeResult | undefined)[],
  stepIdx: number,
  wrapUri: string
): string {
  const referenceRegex = /\$([0-9])+\.([a-zA-Z0-9_\.])+/g;

  return replaceWrapUriToken(
    str.replaceAll(
      referenceRegex,
      (substring) =>
        resolveStepResultReferenceValues(
          stepResults,
          stepIdx,
          substring
        ) as string
    ),
    wrapUri
  );
}
