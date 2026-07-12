import { YStack, XStack } from "tamagui";
import { Button, Card, Paragraph, Text } from "rn_ui_kit";

import { rnUiKitDebugRouteDefinitions } from "../routes";

import type { RnUiKitDebugRouteKey } from "../types";

export function RnUiKitDebugHomePage({
  activeRouteKey,
  onOpenInSheet,
  onRouteChange,
}: {
  activeRouteKey: RnUiKitDebugRouteKey;
  onOpenInSheet?: (key: RnUiKitDebugRouteKey) => void;
  onRouteChange?: (key: RnUiKitDebugRouteKey) => void;
}) {
  return (
    <Card
      description="Switch between debug sections or open a section in a Sheet."
      title="rn_ui_kit debug"
    >
      <YStack gap="$3" p="$3" pt={0}>
        <Paragraph color="$color10">
          The example app renders this debug panel as its home page. Apps can also reuse the same
          sections inside a Sheet or a route.
        </Paragraph>
        <YStack gap="$2">
          {rnUiKitDebugRouteDefinitions.map((definition) => {
            const active = definition.key === activeRouteKey;

            return (
              <YStack
                key={definition.key}
                borderColor={active ? "$accentColor" : "$borderColor"}
                borderWidth={1}
                gap="$2"
                p="$3"
                rounded="$4"
              >
                <XStack gap="$2" items="center" justify="space-between" flexWrap="wrap">
                  <YStack gap="$1" flex={1} minW={220}>
                    <Text fontWeight="700">{definition.label}</Text>
                    {definition.description != null ? (
                      <Text color="$color10" fontSize="$2">
                        {definition.description}
                      </Text>
                    ) : null}
                  </YStack>
                  <XStack gap="$2" flexWrap="wrap">
                    <Button
                      disabled={active}
                      onPress={() => onRouteChange?.(definition.key)}
                      theme={active ? "accent" : undefined}
                    >
                      {active ? "Active" : "Show"}
                    </Button>
                    <Button onPress={() => onOpenInSheet?.(definition.key)} variant="outlined">
                      Open Sheet
                    </Button>
                  </XStack>
                </XStack>
              </YStack>
            );
          })}
        </YStack>
      </YStack>
    </Card>
  );
}
