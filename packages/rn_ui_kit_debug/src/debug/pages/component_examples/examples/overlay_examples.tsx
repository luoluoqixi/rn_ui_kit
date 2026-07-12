import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  AlertDialog,
  Button,
  ContextMenu,
  Dialog,
  Input,
  Menu,
  Popover,
  Sheet,
  Text,
  Tooltip,
} from "rn_ui_kit";

import { ExampleBlock, ExampleRow, ExampleStack } from "../shared";
import type { ComponentExampleDefinition } from "../types";

function DialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <ExampleStack>
      <ExampleBlock description={`当前状态：${open ? "打开" : "关闭"}`}>
        <Dialog
          actions={<Button onPress={() => setOpen(false)}>完成</Button>}
          description="Dialog 会渲染到全局浮层。"
          onOpenChange={setOpen}
          open={open}
          title="Dialog 示例"
          trigger={<Button onPress={() => setOpen(true)}>打开 Dialog</Button>}
        >
          <Text>这里是 Dialog 的正文内容。</Text>
        </Dialog>
      </ExampleBlock>
    </ExampleStack>
  );
}

function AlertDialogExample() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("尚未操作");

  return (
    <ExampleStack>
      <ExampleBlock description={`最近结果：${result}`}>
        <AlertDialog
          cancelLabel="取消"
          destructiveLabel="删除"
          description="此操作仅用于演示，不会删除真实数据。"
          onOpenChange={setOpen}
          open={open}
          title="删除项目"
          trigger={<Button onPress={() => setOpen(true)}>打开 AlertDialog</Button>}
          actions={
            <Button
              onPress={() => {
                setResult("确认删除");
                setOpen(false);
              }}
              theme="red"
            >
              自定义动作
            </Button>
          }
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function ContextMenuExample() {
  const [action, setAction] = useState("尚未选择");

  return (
    <ExampleStack>
      <ExampleBlock description={`最近动作：${action}`}>
        <ContextMenu
          arrow
          items={[
            { label: "重命名", onSelect: () => setAction("重命名"), value: "rename" },
            { label: "separator", separator: true, value: "separator" },
            {
              destructive: true,
              label: "删除",
              onSelect: () => setAction("删除"),
              value: "delete",
            },
          ]}
          trigger={<Button variant="outlined">右键或长按</Button>}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function MenuExample() {
  const [action, setAction] = useState("尚未选择");

  return (
    <ExampleStack>
      <ExampleBlock description={`最近动作：${action}`}>
        <Menu
          arrow
          items={[
            { label: "新建文件", onSelect: () => setAction("新建文件"), value: "new" },
            { label: "打开设置", onSelect: () => setAction("打开设置"), value: "settings" },
            { label: "separator", separator: true, value: "separator" },
            {
              destructive: true,
              label: "清空记录",
              onSelect: () => setAction("清空记录"),
              value: "clear",
            },
          ]}
          trigger={<Button variant="outlined">打开 Menu</Button>}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function PopoverExample() {
  const [name, setName] = useState("rn_ui_kit");

  return (
    <ExampleStack>
      <ExampleBlock description={`当前名称：${name}`}>
        <Popover
          arrow
          content={
            <View style={styles.popoverContent}>
              <Text fontWeight="600">编辑名称</Text>
              <Input onChangeText={setName} value={name} />
            </View>
          }
          trigger={<Button variant="outlined">打开 Popover</Button>}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function SheetExample() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  const openSheet = () => {
    setPosition(0);
    setOpen(true);
  };

  return (
    <ExampleStack>
      <ExampleBlock description={`状态：${open ? `打开，position=${position}` : "关闭"}`}>
        <Button onPress={openSheet}>打开 Sheet</Button>
        <Sheet
          content={
            <View style={styles.sheetContent}>
              <Text fontSize="$6" fontWeight="700">
                Sheet 内容
              </Text>
              <Text opacity={0.6}>可拖拽到不同 snap point，也可拖到底部关闭。</Text>
              <ExampleRow>
                <Button onPress={() => setPosition(1)} variant="outlined">
                  切到第二档
                </Button>
                <Button onPress={() => setOpen(false)}>关闭</Button>
              </ExampleRow>
            </View>
          }
          dismissOnSnapToBottom
          handle
          modal
          onOpenChange={setOpen}
          onPositionChange={setPosition}
          open={open}
          overlay
          position={position}
          snapPoints={[72, 44]}
          snapPointsMode="percent"
          transitionConfig={{ duration: 180, type: "timing" }}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function TooltipExample() {
  return (
    <ExampleStack>
      <ExampleBlock description="Web 悬停显示；Native 主要提供可访问性语义。">
        <Tooltip arrow content="这是 Tooltip 内容">
          <Button variant="outlined">悬停或聚焦</Button>
        </Tooltip>
      </ExampleBlock>
    </ExampleStack>
  );
}

export const overlayExamples = [
  {
    Component: DialogExample,
    description: "通用模态对话框。",
    group: "浮层与菜单",
    key: "dialog",
    label: "Dialog",
  },
  {
    Component: AlertDialogExample,
    description: "确认与危险操作对话框。",
    group: "浮层与菜单",
    key: "alert-dialog",
    label: "AlertDialog",
  },
  {
    Component: ContextMenuExample,
    description: "右键或长按上下文菜单。",
    group: "浮层与菜单",
    key: "context-menu",
    label: "ContextMenu",
  },
  {
    Component: MenuExample,
    description: "按钮触发的菜单。",
    group: "浮层与菜单",
    key: "menu",
    label: "Menu",
  },
  {
    Component: PopoverExample,
    description: "带输入内容的浮层。",
    group: "浮层与菜单",
    key: "popover",
    label: "Popover",
  },
  {
    Component: SheetExample,
    description: "多档位可拖拽 Sheet。",
    group: "浮层与菜单",
    key: "sheet",
    label: "Sheet",
  },
  {
    Component: TooltipExample,
    description: "悬停或聚焦提示。",
    group: "浮层与菜单",
    key: "tooltip",
    label: "Tooltip",
  },
] satisfies ComponentExampleDefinition[];

const styles = StyleSheet.create({
  popoverContent: { gap: 12, minWidth: 240, padding: 12 },
  sheetContent: { gap: 16, padding: 24 },
});
