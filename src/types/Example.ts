export type Example = {
  title: string;
  steps: ExampleStep[];
};

export type ExampleStep = {
  uri: string;
  method: string;
  args: Record<string, unknown>;
  description?: string;
}