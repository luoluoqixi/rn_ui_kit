import { useState } from "react";
import { Button, Form, Input, Label, RadioGroup, Select, Text, TextArea } from "rn_ui_kit";

import { ExampleBlock, ExampleStack } from "../shared";
import type { ComponentExampleDefinition } from "../types";

function InputExample() {
  const [value, setValue] = useState("rn_ui_kit");

  return (
    <ExampleStack>
      <ExampleBlock description={`当前输入：${value || "空"}`}>
        <Input onChangeText={setValue} placeholder="输入组件名称" value={value} />
      </ExampleBlock>
    </ExampleStack>
  );
}

function TextAreaExample() {
  const [value, setValue] = useState("这里可以输入多行内容。");

  return (
    <ExampleStack>
      <ExampleBlock description={`${value.length} 个字符`}>
        <TextArea onChangeText={setValue} style={{ minHeight: 140 }} value={value} />
      </ExampleBlock>
    </ExampleStack>
  );
}

function SelectExample() {
  const [value, setValue] = useState<string | null>("ocean");

  return (
    <ExampleStack>
      <ExampleBlock description={`当前选择：${value ?? "未选择"}`} title="Custom Sheet Select">
        <Select
          items={[
            { label: "Ocean", value: "ocean" },
            { label: "Sakura", value: "sakura" },
            { label: "Forest", value: "forest" },
            { label: "Golden", value: "golden" },
          ]}
          native="custom-sheet"
          nativeTrigger
          onValueChange={setValue}
          placeholder="选择主题"
          value={value ?? undefined}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function RadioGroupExample() {
  const [value, setValue] = useState("recent");

  return (
    <ExampleStack>
      <ExampleBlock description={`当前排序：${value}`}>
        <RadioGroup
          items={[
            { label: "最近更新", value: "recent" },
            { label: "名称", value: "name" },
            { label: "大小", value: "size" },
          ]}
          onValueChange={setValue}
          value={value}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

function FormExample() {
  const [name, setName] = useState("demo-workspace");
  const [submitCount, setSubmitCount] = useState(0);

  return (
    <ExampleStack>
      <ExampleBlock description={`已提交 ${submitCount} 次`} title="受控表单">
        <Form
          onSubmit={() => setSubmitCount((current) => current + 1)}
          trigger={<Button theme="accent">提交</Button>}
        >
          <Input onChangeText={setName} placeholder="工作区名称" value={name} />
        </Form>
        <Text opacity={0.6}>提交值：{name}</Text>
      </ExampleBlock>
    </ExampleStack>
  );
}

function LabelExample() {
  const [value, setValue] = useState("");

  return (
    <ExampleStack>
      <ExampleBlock>
        <Label htmlFor="component-example-label-input">工作区名称</Label>
        <Input
          id="component-example-label-input"
          onChangeText={setValue}
          placeholder="Label 与 Input 关联"
          value={value}
        />
      </ExampleBlock>
    </ExampleStack>
  );
}

export const formExamples = [
  {
    Component: InputExample,
    description: "单行受控输入框。",
    group: "输入与表单",
    key: "input",
    label: "Input",
  },
  {
    Component: TextAreaExample,
    description: "多行文本输入。",
    group: "输入与表单",
    key: "text-area",
    label: "TextArea",
  },
  {
    Component: SelectExample,
    description: "使用 custom-sheet 的选择器。",
    group: "输入与表单",
    key: "select",
    label: "Select",
  },
  {
    Component: RadioGroupExample,
    description: "受控单选组。",
    group: "输入与表单",
    key: "radio-group",
    label: "RadioGroup",
  },
  {
    Component: FormExample,
    description: "输入与提交触发器。",
    group: "输入与表单",
    key: "form",
    label: "Form",
  },
  {
    Component: LabelExample,
    description: "Label 与表单字段关联。",
    group: "输入与表单",
    key: "label",
    label: "Label",
  },
] satisfies ComponentExampleDefinition[];
