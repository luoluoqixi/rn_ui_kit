import { RnUiKitUiComponentsDebugPage } from "./pages/sections/ui_components_debug_page";
import { RnUiKitExampleControlsPage } from "./pages/sections/example_controls_page";
import { RnUiKitExampleLayoutPage } from "./pages/sections/example_layout_page";

import type { RnUiKitDebugRouteDefinition, RnUiKitDebugRouteKey } from "./types";

export const rnUiKitDebugRouteDefinitions = [
  {
    Page: RnUiKitUiComponentsDebugPage,
    description: "A full overview of rn_ui_kit components and interactions.",
    key: "components",
    label: "Components",
    presentation: "static",
  },
  {
    Page: RnUiKitExampleControlsPage,
    description: "A small page for switching state, values, and visual modes.",
    key: "controls",
    label: "Controls example",
    presentation: "scroll",
  },
  {
    Page: RnUiKitExampleLayoutPage,
    description: "A small page for layout, list, and card navigation examples.",
    key: "layout",
    label: "Layout example",
    presentation: "scroll",
  },
] satisfies RnUiKitDebugRouteDefinition[];

const routeKeys = new Set<RnUiKitDebugRouteKey>(
  rnUiKitDebugRouteDefinitions.map((definition) => definition.key),
);

export function isRnUiKitDebugRouteKey(value: string | undefined): value is RnUiKitDebugRouteKey {
  return value != null && routeKeys.has(value as RnUiKitDebugRouteKey);
}

export function getRnUiKitDebugRouteDefinition(
  key: RnUiKitDebugRouteKey,
): RnUiKitDebugRouteDefinition {
  const routeDefinition = rnUiKitDebugRouteDefinitions.find((definition) => definition.key === key);

  if (!routeDefinition) {
    throw new Error(`Unknown rn_ui_kit debug route: ${key}`);
  }

  return routeDefinition;
}
