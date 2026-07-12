import { useState } from "react";
import {
  Button,
  Checkbox,
  Progress,
  Slider,
  Spinner,
  Switch,
  Text,
  ToggleGroup,
  confirmNative,
  useToast,
} from "rn_ui_kit";

import { ExampleBlock, ExampleRow, ExampleStack } from "../shared";
import type { ComponentExampleDefinition } from "../types";

function ButtonExample() {
  const [count, setCount] = useState(0);

  return (
    <ExampleStack>
      <ExampleBlock description={`已点击 ${count} 次`} title="按钮状态">
        <ExampleRow>
          <Button onPress={() => setCount((current) => current + 1)} theme="accent">
            点击计数
          </Button>
          <Button onPress={() => setCount(0)} variant="outlined">
            重置
          </Button>
          <Button disabled>禁用按钮</Button>
        </ExampleRow>
      </ExampleBlock>
    </ExampleStack>
  );
}

function CheckboxExample() {
  const [checked, setChecked] = useState(true);

  return (
    <ExampleStack>
      <ExampleBlock description={`当前状态：${checked ? "选中" : "未选中"}`}>
        <Checkbox
          checked={checked}
          label="允许发送组件状态通知"
          onCheckedChange={(next) => setChecked(next === true)}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function SwitchExample() {
  const [checked, setChecked] = useState(true);

  return (
    <ExampleStack>
      <ExampleBlock description={`当前状态：${checked ? "开启" : "关闭"}`}>
        <Switch
          checked={checked}
          label="自动同步"
          labelPosition="end"
          native={false}
          onCheckedChange={setChecked}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function ToggleGroupExample() {
  const [value, setValue] = useState("preview");

  return (
    <ExampleStack>
      <ExampleBlock description={`当前模式：${value || "未选择"}`}>
        <ToggleGroup
          items={[
            { label: "编辑", value: "edit" },
            { label: "预览", value: "preview" },
            { label: "源码", value: "source" },
          ]}
          onValueChange={setValue}
          type="single"
          value={value}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function SliderExample() {
  const [value, setValue] = useState(42);

  return (
    <ExampleStack>
      <ExampleBlock description={`当前值：${value}`} title="可拖拽 Slider">
        <Slider
          max={100}
          min={0}
          onValueChange={(next) => setValue(next[0] ?? 0)}
          step={1}
          value={[value]}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function SpinnerExample() {
  const [visible, setVisible] = useState(true);

  return (
    <ExampleStack>
      <ExampleBlock>
        <ExampleRow>
          {visible ? <Spinner size="large" /> : <Text>加载已暂停</Text>}
          <Button onPress={() => setVisible((current) => !current)} variant="outlined">
            {visible ? "停止" : "开始"}
          </Button>
        </ExampleRow>
      </ExampleBlock>
    </ExampleStack>
  );
}

function ProgressExample() {
  const [value, setValue] = useState(35);

  return (
    <ExampleStack>
      <ExampleBlock description={`完成度：${value}%`}>
        <Progress max={100} value={value} width="100%" />
        <ExampleRow>
          <Button onPress={() => setValue((current) => Math.max(0, current - 10))}>-10</Button>
          <Button onPress={() => setValue((current) => Math.min(100, current + 10))}>+10</Button>
        </ExampleRow>
      </ExampleBlock>
    </ExampleStack>
  );
}

function ToastExample() {
  const { toast } = useToast();

  return (
    <ExampleStack>
      <ExampleBlock description="按钮会调用 RootProvider 中已经挂载的 Toaster。">
        <ExampleRow>
          <Button
            onPress={() => toast.success("保存成功", { description: "组件示例状态已更新。" })}
            theme="green"
          >
            Success
          </Button>
          <Button
            onPress={() => toast.error("保存失败", { description: "这是错误反馈示例。" })}
            theme="red"
          >
            Error
          </Button>
          <Button onPress={() => toast.closeAll()} variant="outlined">
            关闭全部
          </Button>
        </ExampleRow>
      </ExampleBlock>
    </ExampleStack>
  );
}

function NativeDialogExample() {
  const [result, setResult] = useState("尚未打开");

  const openDialog = async () => {
    const next = await confirmNative({
      cancelText: "取消",
      confirmText: "确认",
      message: "这是平台原生确认弹窗。",
      title: "Native Dialog",
    });
    setResult(String(next));
  };

  return (
    <ExampleStack>
      <ExampleBlock description={`最近结果：${result}`}>
        <Button onPress={() => void openDialog()}>打开原生弹窗</Button>
      </ExampleBlock>
    </ExampleStack>
  );
}

export const actionFeedbackExamples = [
  {
    Component: ButtonExample,
    description: "按钮样式、禁用状态与点击事件。",
    group: "动作与反馈",
    key: "button",
    label: "Button",
  },
  {
    Component: CheckboxExample,
    description: "受控复选状态。",
    group: "动作与反馈",
    key: "checkbox",
    label: "Checkbox",
  },
  {
    Component: SwitchExample,
    description: "受控开关状态。",
    group: "动作与反馈",
    key: "switch",
    label: "Switch",
  },
  {
    Component: ToggleGroupExample,
    description: "单选 ToggleGroup。",
    group: "动作与反馈",
    key: "toggle-group",
    label: "ToggleGroup",
  },
  {
    Component: SliderExample,
    description: "Slider 拖拽与数值更新。",
    group: "动作与反馈",
    key: "slider",
    label: "Slider",
  },
  {
    Component: SpinnerExample,
    description: "加载指示器。",
    group: "动作与反馈",
    key: "spinner",
    label: "Spinner",
  },
  {
    Component: ProgressExample,
    description: "可更新的进度状态。",
    group: "动作与反馈",
    key: "progress",
    label: "Progress",
  },
  {
    Component: ToastExample,
    description: "成功、失败和关闭 Toast。",
    group: "动作与反馈",
    key: "toast",
    label: "Toast",
  },
  {
    Component: NativeDialogExample,
    description: "平台原生确认弹窗。",
    group: "动作与反馈",
    key: "native-dialog",
    label: "Native Dialog",
  },
] satisfies ComponentExampleDefinition[];
