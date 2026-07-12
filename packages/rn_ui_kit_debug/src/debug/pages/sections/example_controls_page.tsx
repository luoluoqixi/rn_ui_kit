import { useState } from "react";
import { XStack, YStack } from "tamagui";
import { Button, Card, Input, Label, Paragraph, Slider, Switch, Text } from "rn_ui_kit";

import type { RnUiKitDebugSectionContentProps } from "../../types";

export function RnUiKitExampleControlsPage({ header }: RnUiKitDebugSectionContentProps) {
  const [enabled, setEnabled] = useState(true);
  const [name, setName] = useState("rn_ui_kit");
  const [value, setValue] = useState(48);

  return (
    <YStack gap="$3">
      {header}
      <Card description="A simple stateful page for app-level page switching demos." title="Controls">
        <YStack gap="$4" p="$3" pt={0}>
          <Paragraph color="$color10">
            This page replaces the LonaNote-specific path/workspace debug sections with a small,
            generic example.
          </Paragraph>
          <YStack gap="$2">
            <Label htmlFor="rn-ui-kit-debug-name">Name</Label>
            <Input
              id="rn-ui-kit-debug-name"
              onChangeText={setName}
              placeholder="Type a label"
              value={name}
            />
            <Text color="$color10">Current value: {name}</Text>
          </YStack>
          <XStack gap="$3" items="center" flexWrap="wrap">
            <Switch checked={enabled} label="Enabled" onCheckedChange={setEnabled} />
            <Button disabled={!enabled} theme="accent">
              Action
            </Button>
          </XStack>
          <YStack gap="$2">
            <Text fontWeight="700">Slider: {value}</Text>
            <Slider
              max={100}
              min={0}
              onValueChange={(nextValue) => setValue(nextValue[0] ?? 0)}
              step={1}
              value={[value]}
            />
          </YStack>
        </YStack>
      </Card>
    </YStack>
  );
}
