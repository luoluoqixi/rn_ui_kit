import "rn_ui_kit/initialize";

import "./tamagui.generated.css";
import {
  AppStatusBar,
  RootProvider,
  type UiPreferences,
  useColorSchemeSettings,
} from "rn_ui_kit";
import { RnUiKitDebugPanel } from "rn_ui_kit_debug";
import { useMemo, useState } from "react";

import config from "./tamagui.config";
import { accentThemeNames } from "./themes";
import { createAppDebugPages } from "./debug_pages";

const preferences = {
  appearance: {
    accentColor: "ocean",
    backgroundFollowsTheme: false,
    themeMode: "system",
  },
} satisfies UiPreferences;

function DemoStatusBar() {
  const { resolvedColorScheme } = useColorSchemeSettings();

  return <AppStatusBar colorScheme={resolvedColorScheme} />;
}

export default function App() {
  const [currentPreferences, setCurrentPreferences] = useState<UiPreferences>(preferences);
  const pages = useMemo(
    () => createAppDebugPages(currentPreferences, (updater) => setCurrentPreferences(updater)),
    [currentPreferences],
  );

  return (
    <RootProvider
      accentThemeNames={accentThemeNames}
      preferences={currentPreferences}
      tamaguiConfig={config}
    >
      <DemoStatusBar />
      <RnUiKitDebugPanel pages={pages} />
    </RootProvider>
  );
}
