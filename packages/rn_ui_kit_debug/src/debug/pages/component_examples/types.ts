import type { ComponentType } from "react";

export type ComponentExampleLayout = "fill" | "scroll";

export type ComponentExampleDefinition = {
  Component: ComponentType;
  description: string;
  group: string;
  key: string;
  label: string;
  layout?: ComponentExampleLayout;
};
