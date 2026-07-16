import { HeaderHeightContext } from "@react-navigation/elements";
import { type NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  NativeList,
  NativeListNavigationItem,
  NativeListSection,
  NativeSheetScrollContent,
  ScrollView,
  Text,
  isIos26Plus,
  useAppBackgroundColors,
} from "rn_ui_kit";

import type { RnUiKitDebugSectionContentProps } from "../../types";
import { componentExampleDefinitions } from "./catalog";
import type { ComponentExampleDefinition } from "./types";

type DebugPanelNavigationParamList = Record<string, undefined>;

const sortedComponentExampleDefinitions = [...componentExampleDefinitions].sort(
  (left, right) =>
    left.label.localeCompare(right.label, "en", { numeric: true, sensitivity: "base" }) ||
    left.key.localeCompare(right.key),
);

export function getComponentExampleRouteName(key: string) {
  return `component-example:${key}`;
}

/** The examples list lives on the debug panel stack; only its detail routes are separate screens. */
export function RnUiKitComponentExamplesDebugPage({
  header,
  headerTransparent = false,
  layoutHost = "default",
}: RnUiKitDebugSectionContentProps) {
  const appBackgroundColors = useAppBackgroundColors();
  const navigation = useNavigation<NavigationProp<DebugPanelNavigationParamList>>();
  const adjustsForTransparentHeader = layoutHost === "default" && headerTransparent;
  const pageBackgroundColor =
    layoutHost === "nativeSheet" && isIos26Plus()
      ? "transparent"
      : appBackgroundColors.screen;

  return (
    <View style={[styles.root, { backgroundColor: pageBackgroundColor }]}>
      {header != null ? <View style={styles.routeHeader}>{header}</View> : null}
      <NativeList
        automaticallyAdjustsScrollIndicatorInsets={
          adjustsForTransparentHeader ? true : undefined
        }
      >
        <NativeListSection>
          {sortedComponentExampleDefinitions.map((definition) => (
            <NativeListNavigationItem
              key={definition.key}
              onPress={() => navigation.navigate(getComponentExampleRouteName(definition.key))}
              subtitle={definition.description}
              title={definition.label}
            />
          ))}
        </NativeListSection>
      </NativeList>
    </View>
  );
}

export function RnUiKitComponentExampleDetailPage({
  definition,
  headerTransparent = false,
  layoutHost = "default",
}: {
  definition: ComponentExampleDefinition;
  headerTransparent?: boolean;
  layoutHost?: "default" | "nativeSheet";
}) {
  const appBackgroundColors = useAppBackgroundColors();
  const headerHeight = useContext(HeaderHeightContext) ?? 0;
  const isFocused = useIsFocused();
  const ActiveExample = definition.Component;
  const pageBackgroundColor =
    layoutHost === "nativeSheet" && isIos26Plus()
      ? "transparent"
      : appBackgroundColors.screen;

  if (definition.layout === "fill") {
    return (
      <View
        style={[
          styles.detailBody,
          { backgroundColor: pageBackgroundColor },
          headerTransparent && { paddingTop: headerHeight },
        ]}
      >
        <ActiveExample />
      </View>
    );
  }

  const contents = (
    <View style={[styles.scrollContent, { backgroundColor: pageBackgroundColor }]}>
      <Text opacity={0.6}>{definition.description}</Text>
      <ActiveExample />
    </View>
  );

  const scrollStyle = [styles.detailBody, { backgroundColor: pageBackgroundColor }];
  if (layoutHost === "nativeSheet") {
    return (
      <NativeSheetScrollContent
        bindToNativeSheet={isFocused}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        style={scrollStyle}
      >
        {contents}
      </NativeSheetScrollContent>
    );
  }

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets={headerTransparent ? true : undefined}
      contentInsetAdjustmentBehavior={headerTransparent ? "automatic" : undefined}
      nestedScrollEnabled
      showsVerticalScrollIndicator
      style={scrollStyle}
    >
      {contents}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailBody: { flex: 1, minHeight: 0 },
  root: { flex: 1, minHeight: 0 },
  routeHeader: { paddingHorizontal: 20, paddingTop: 8 },
  scrollContent: { gap: 16, padding: 16, paddingBottom: 32 },
});
