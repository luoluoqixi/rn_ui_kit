import { useState } from "react";
import { YStack } from "tamagui";
import {
  Button,
  Card,
  ListGroup,
  NativeList,
  NativeListNavigationItem,
  NativeListSection,
  Paragraph,
  Separator,
  Text,
} from "rn_ui_kit";

import type { RnUiKitDebugSectionContentProps } from "../../types";

export function RnUiKitExampleLayoutPage({ header }: RnUiKitDebugSectionContentProps) {
  const [selected, setSelected] = useState("None");

  return (
    <YStack gap="$3">
      {header}
      <Card description="A generic list and layout page." title="Layout">
        <YStack gap="$4" p="$3" pt={0}>
          <Paragraph color="$color10">
            This page gives the debug panel a second simple section without LonaNote-specific
            workspace data.
          </Paragraph>
          <NativeList>
            <NativeListSection title="Navigation examples">
              <NativeListNavigationItem
                onPress={() => setSelected("Account")}
                title="Account"
                value="Open"
              />
              <NativeListNavigationItem
                onPress={() => setSelected("Appearance")}
                title="Appearance"
                value="Open"
              />
            </NativeListSection>
          </NativeList>
          <Separator />
          <ListGroup
            items={[
              { subTitle: "A repeated item example", title: "First item" },
              { subTitle: "Another repeated item example", title: "Second item" },
            ]}
            rounded="$4"
            separator
          />
          <Text color="$color10">Last selected: {selected}</Text>
          <Button onPress={() => setSelected("Reset")} variant="outlined">
            Reset selection
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
}
