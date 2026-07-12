import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  NativeList,
  NativeListNavigationItem,
  NativeListSection,
  ScrollView,
  Text,
  useAppBackgroundColors,
} from "rn_ui_kit";

import type { RnUiKitDebugSectionContentProps } from "../../types";
import { componentExampleDefinitions } from "./catalog";
import type { ComponentExampleDefinition } from "./types";

type DebugPanelNavigationParamList = Record<string, undefined>;

export function getComponentExampleRouteName(key: string) {
  return `component-example:${key}`;
}

/** The examples list lives on the debug panel stack; only its detail routes are separate screens. */
export function RnUiKitComponentExamplesDebugPage({ header }: RnUiKitDebugSectionContentProps) {
  const appBackgroundColors = useAppBackgroundColors();
  const navigation = useNavigation<NavigationProp<DebugPanelNavigationParamList>>();
  const groupedDefinitions = useMemo(() => {
    return Array.from(
      componentExampleDefinitions.reduce((groups, definition) => {
        const entries = groups.get(definition.group) ?? [];
        entries.push(definition);
        groups.set(definition.group, entries);
        return groups;
      }, new Map<string, ComponentExampleDefinition[]>()),
    );
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: appBackgroundColors.screen }]}>
      {header != null ? <View style={styles.routeHeader}>{header}</View> : null}
      <NativeList>
        {groupedDefinitions.map(([group, definitions]) => (
          <NativeListSection key={group} title={group}>
            {definitions.map((definition) => (
              <NativeListNavigationItem
                key={definition.key}
                onPress={() => navigation.navigate(getComponentExampleRouteName(definition.key))}
                subtitle={definition.description}
                title={definition.label}
              />
            ))}
          </NativeListSection>
        ))}
      </NativeList>
    </View>
  );
}

export function RnUiKitComponentExampleDetailPage({
  definition,
}: {
  definition: ComponentExampleDefinition;
}) {
  const appBackgroundColors = useAppBackgroundColors();
  const ActiveExample = definition.Component;

  if (definition.layout === "fill") {
    return (
      <View style={[styles.detailBody, { backgroundColor: appBackgroundColors.screen }]}>
        <ActiveExample />
      </View>
    );
  }

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator
      style={[styles.detailBody, { backgroundColor: appBackgroundColors.screen }]}
    >
      <View style={[styles.scrollContent, { backgroundColor: appBackgroundColors.screen }]}>
        <Text opacity={0.6}>{definition.description}</Text>
        <ActiveExample />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailBody: { flex: 1, minHeight: 0 },
  root: { flex: 1, minHeight: 0 },
  routeHeader: { paddingHorizontal: 20, paddingTop: 8 },
  scrollContent: { gap: 16, padding: 16, paddingBottom: 32 },
});
