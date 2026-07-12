import { StyleSheet, View } from "react-native";
import { Avatar, Card, H1, H3, Image, Link, Paragraph, Separator, Text } from "rn_ui_kit";

import { ExampleBlock, ExampleStack } from "../shared";
import type { ComponentExampleDefinition } from "../types";

function AvatarExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="图片不可用时显示 fallback。">
        <View style={styles.avatarRow}>
          <Avatar fallback="RN" size="$6" />
          <Avatar fallback="UI" size="$5" />
          <Avatar fallback="KIT" size="$4" />
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

function TextExample() {
  return (
    <ExampleStack>
      <ExampleBlock>
        <H1>一级标题</H1>
        <H3>三级标题</H3>
        <Paragraph>Paragraph 适合较长的正文内容，并继承当前主题颜色。</Paragraph>
        <Text fontWeight="600">普通 Text 可以自由组合字号和字重。</Text>
        <Text opacity={0.6}>辅助说明文字</Text>
      </ExampleBlock>
    </ExampleStack>
  );
}

function ImageExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="远程图片、尺寸和圆角。">
        <View style={styles.imageHost}>
          <Image
            alt="组件示例图片"
            borderRadius={16}
            height={220}
            objectFit="cover"
            src="https://picsum.photos/640/440"
            width="100%"
          />
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

function CardExample() {
  return (
    <ExampleStack>
      <Card
        description="Card 默认组合标题、说明、内容和 footer。"
        footer={<Text opacity={0.6}>Footer 内容</Text>}
        title="组件卡片"
      >
        <Text>这里是 Card 的正文区域。</Text>
      </Card>
    </ExampleStack>
  );
}

function SeparatorExample() {
  return (
    <ExampleStack>
      <ExampleBlock>
        <Text>上方内容</Text>
        <Separator />
        <Text>下方内容</Text>
        <View style={styles.verticalSeparatorRow}>
          <Text>左侧</Text>
          <Separator vertical />
          <Text>右侧</Text>
        </View>
      </ExampleBlock>
    </ExampleStack>
  );
}

function LinkExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="点击后交给平台打开外部链接。">
        <Link href="https://tamagui.dev" target="_blank">
          打开 Tamagui 文档
        </Link>
      </ExampleBlock>
    </ExampleStack>
  );
}

export const displayExamples = [
  {
    Component: AvatarExample,
    description: "头像与 fallback。",
    group: "内容展示",
    key: "avatar",
    label: "Avatar",
  },
  {
    Component: TextExample,
    description: "标题、正文与辅助文本。",
    group: "内容展示",
    key: "text",
    label: "Text",
  },
  {
    Component: ImageExample,
    description: "远程图片展示。",
    group: "内容展示",
    key: "image",
    label: "Image",
  },
  {
    Component: CardExample,
    description: "组合式卡片结构。",
    group: "内容展示",
    key: "card",
    label: "Card",
  },
  {
    Component: SeparatorExample,
    description: "水平与垂直分隔线。",
    group: "内容展示",
    key: "separator",
    label: "Separator",
  },
  {
    Component: LinkExample,
    description: "外部链接行为。",
    group: "内容展示",
    key: "link",
    label: "Link",
  },
] satisfies ComponentExampleDefinition[];

const styles = StyleSheet.create({
  avatarRow: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 16 },
  imageHost: { alignSelf: "center", width: "100%" },
  verticalSeparatorRow: { alignItems: "center", flexDirection: "row", gap: 12, height: 40 },
});
