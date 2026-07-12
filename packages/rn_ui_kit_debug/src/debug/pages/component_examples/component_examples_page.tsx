import { useEffect, useMemo, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import {
  Button,
  NativeList,
  NativeListNavigationItem,
  NativeListSection,
  ScrollView,
  Text,
} from "rn_ui_kit";

import type { RnUiKitDebugSectionContentProps } from "../../types";
import { componentExampleDefinitions, getComponentExampleDefinition } from "./catalog";
import type { ComponentExampleDefinition } from "./types";

export function RnUiKitComponentExamplesDebugPage({
  header,
}: RnUiKitDebugSectionContentProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeDefinition =
    activeKey == null ? null : getComponentExampleDefinition(activeKey);

  useEffect(() => {
    if (activeDefinition == null) return;

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      setActiveKey(null);
      return true;
    });

    return () => subscription.remove();
  }, [activeDefinition]);

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

  if (activeDefinition != null) {
    const ActiveExample = activeDefinition.Component;

    return (
      <View style={styles.root}>
        <View style={styles.detailHeader}>
          <Button chromeless onPress={() => setActiveKey(null)} size="$3">
            返回组件列表
          </Button>
          <View style={styles.detailTitle}>
            <Text fontSize="$7" fontWeight="700">
              {activeDefinition.label}
            </Text>
            <Text opacity={0.6}>{activeDefinition.description}</Text>
          </View>
        </View>
        {activeDefinition.layout === "fill" ? (
          <View style={styles.detailBody}>
            <ActiveExample />
          </View>
        ) : (
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            style={styles.detailBody}
          >
            <View style={styles.scrollContent}>
              <ActiveExample />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {header != null ? <View style={styles.routeHeader}>{header}</View> : null}
      <NativeList>
        {groupedDefinitions.map(([group, definitions]) => (
          <NativeListSection key={group} title={group}>
            {definitions.map((definition) => (
              <NativeListNavigationItem
                key={definition.key}
                onPress={() => setActiveKey(definition.key)}
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

const styles = StyleSheet.create({
  detailBody: { flex: 1, minHeight: 0 },
  detailHeader: {
    borderBottomColor: "rgba(128, 128, 128, 0.24)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailTitle: { gap: 4 },
  root: { flex: 1, minHeight: 0 },
  routeHeader: { paddingHorizontal: 20, paddingTop: 8 },
  scrollContent: { padding: 16, paddingBottom: 32 },
});
