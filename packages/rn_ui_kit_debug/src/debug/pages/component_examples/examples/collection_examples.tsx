import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  FlashList,
  ListGroup,
  ListItem,
  NativeList,
  NativeListNavigationItem,
  NativeListSection,
  NativeListSelectItem,
  NativeListSwitchItem,
  ScrollView,
  Text,
} from "rn_ui_kit";

import { ExampleBlock, ExampleStack } from "../shared";
import type { ComponentExampleDefinition } from "../types";

function NativeListExample() {
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<string | null>("system");
  const [lastAction, setLastAction] = useState("尚未点击");

  return (
    <ExampleStack>
      <ExampleBlock description={`最近动作：${lastAction}`}>
        <View style={styles.nativeListFrame}>
          <NativeList nestedScrollEnabled>
            <NativeListSection title="NativeList">
              <NativeListNavigationItem
                onPress={() => setLastAction("打开详情")}
                subtitle="带有 chevron 的导航行"
                title="详情"
              />
              <NativeListSwitchItem
                switchProps={{ checked: enabled, onCheckedChange: setEnabled }}
                title="启用功能"
              />
              <NativeListSelectItem
                selectProps={{
                  native: "custom-sheet",
                  onValueChange: setMode,
                  options: [
                    { label: "浅色", value: "light" },
                    { label: "深色", value: "dark" },
                    { label: "跟随系统", value: "system" },
                  ],
                  value: mode ?? undefined,
                }}
                title="主题模式"
              />
            </NativeListSection>
          </NativeList>
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

function ListGroupExample() {
  const [lastAction, setLastAction] = useState("尚未点击");

  return (
    <ExampleStack>
      <ExampleBlock description={`最近动作：${lastAction}`}>
        <ListGroup
          items={[
            {
              onPress: () => setLastAction("最近文件"),
              subTitle: "显示最近访问的文件",
              title: "最近文件",
            },
            {
              onPress: () => setLastAction("收藏夹"),
              subTitle: "显示收藏内容",
              title: "收藏夹",
            },
          ]}
          rounded="$4"
          separator
          size="$4"
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function ListItemExample() {
  const [pressed, setPressed] = useState(0);

  return (
    <ExampleStack>
      <ExampleBlock description={`已点击 ${pressed} 次`}>
        <ListItem
          onPress={() => setPressed((current) => current + 1)}
          style={styles.listItem}
          subTitle="ListItem 可以独立使用"
          title="单个列表项"
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

const flashListData = Array.from({ length: 40 }, (_, index) => ({
  id: `flash-row-${index}`,
  label: `FlashList row ${index + 1}`,
}));

function FlashListExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="固定高度区域内渲染 40 行。">
        <View style={styles.listFrame}>
          <FlashList
            data={flashListData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listRow}>
                <Text>{item.label}</Text>
              </View>
            )}
          />
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

function ScrollViewExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="下方区域拥有独立滚动状态。">
        <View style={styles.scrollFrame}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator>
            {Array.from({ length: 20 }, (_, index) => (
              <View key={index} style={styles.listRow}>
                <Text>ScrollView row {index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

export const collectionExamples = [
  {
    Component: NativeListExample,
    description: "导航、Switch 和 Select 列表项。",
    group: "列表与滚动",
    key: "native-list",
    label: "NativeList",
  },
  {
    Component: ListGroupExample,
    description: "带分隔线的 ListItem 组合。",
    group: "列表与滚动",
    key: "list-group",
    label: "ListGroup",
  },
  {
    Component: ListItemExample,
    description: "可独立点击的列表项。",
    group: "列表与滚动",
    key: "list-item",
    label: "ListItem",
  },
  {
    Component: FlashListExample,
    description: "虚拟化长列表。",
    group: "列表与滚动",
    key: "flash-list",
    label: "FlashList",
  },
  {
    Component: ScrollViewExample,
    description: "独立滚动容器。",
    group: "列表与滚动",
    key: "scroll-view",
    label: "ScrollView",
  },
] satisfies ComponentExampleDefinition[];

const styles = StyleSheet.create({
  listFrame: { height: 320, minHeight: 0 },
  listItem: { borderRadius: 12, borderWidth: StyleSheet.hairlineWidth },
  listRow: {
    borderBottomColor: "rgba(128, 128, 128, 0.22)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  nativeListFrame: { height: 360, minHeight: 0 },
  scrollFrame: { height: 260, minHeight: 0 },
});
