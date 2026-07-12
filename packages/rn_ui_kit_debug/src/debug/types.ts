import type { ComponentProps, ComponentType, ReactNode } from "react";
import type { ScrollView, YStack } from "tamagui";

export type RnUiKitDebugRouteKey = "components" | "controls" | "layout";
export type RnUiKitDebugSectionPresentation = "scroll" | "static";

export type RnUiKitDebugSectionContentProps = {
  header?: ReactNode;
};

export type RnUiKitDebugRouteDefinition = {
  description?: string;
  key: RnUiKitDebugRouteKey;
  label: string;
  Page: ComponentType<RnUiKitDebugSectionContentProps>;
  presentation: RnUiKitDebugSectionPresentation;
};

export type RnUiKitDebugPanelProps = ComponentProps<typeof YStack> & {
  initialRouteKey?: RnUiKitDebugRouteKey;
  contentProps?: ComponentProps<typeof ScrollView>;
};

export type RnUiKitUiComponentsDebugPageProps = RnUiKitDebugSectionContentProps;
