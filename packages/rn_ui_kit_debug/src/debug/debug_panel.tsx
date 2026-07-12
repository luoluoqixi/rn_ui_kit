import { useMemo, useState } from "react";
import { View } from "react-native";
import { ScrollView, YStack } from "tamagui";
import { Button, Sheet, Text } from "rn_ui_kit";

import { RnUiKitDebugHomePage } from "./pages/debug_home_page";
import { RnUiKitDebugSectionPage } from "./pages/debug_section_page";
import { getRnUiKitDebugRouteDefinition } from "./routes";

import type { RnUiKitDebugPanelProps, RnUiKitDebugRouteKey } from "./types";

export function RnUiKitDebugPanel({
  contentProps,
  initialRouteKey = "components",
  ...props
}: RnUiKitDebugPanelProps) {
  const [routeKey, setRouteKey] = useState<RnUiKitDebugRouteKey>(initialRouteKey);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetPosition, setSheetPosition] = useState(0);
  const routeDefinition = useMemo(() => getRnUiKitDebugRouteDefinition(routeKey), [routeKey]);

  return (
    <YStack background="$background" flex={1} {...props}>
      <ScrollView flex={1} {...contentProps}>
        <YStack gap="$4" p="$4">
          <RnUiKitDebugHomePage
            activeRouteKey={routeKey}
            onOpenInSheet={(key) => {
              setRouteKey(key);
              setSheetPosition(0);
              setSheetOpen(true);
            }}
            onRouteChange={setRouteKey}
          />
          <RnUiKitDebugSectionPage sectionKey={routeKey} />
        </YStack>
      </ScrollView>

      <Sheet.Controller hidden={false} onOpenChange={setSheetOpen} open={sheetOpen}>
        <Sheet
          content={
            <View style={{ gap: 12, padding: 20 }}>
              <Text fontSize="$6" fontWeight="700">
                {routeDefinition.label}
              </Text>
              <Text color="$color10">
                This is the same debug section opened from a Sheet example.
              </Text>
              <RnUiKitDebugSectionPage sectionKey={routeKey} />
              <Button onPress={() => setSheetOpen(false)} theme="accent">
                Close Sheet
              </Button>
            </View>
          }
          dismissOnSnapToBottom
          handle
          modal
          onOpenChange={setSheetOpen}
          onPositionChange={setSheetPosition}
          open={sheetOpen}
          overlay
          position={sheetPosition}
          snapPoints={["82%"]}
          snapPointsMode="percent"
          transition="200ms"
        />
      </Sheet.Controller>
    </YStack>
  );
}
