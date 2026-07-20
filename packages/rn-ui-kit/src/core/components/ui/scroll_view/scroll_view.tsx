import { forwardRef } from "react";
import { ScrollView as ReactNativeScrollView } from "react-native";
import { ScrollView as TamaguiScrollView } from "tamagui";

import { useTrueSheetScrollLayout } from "../sheet/native_sheet/true_sheet/true_sheet_scroll_context";
import { isWeb, os } from "../utils/platform";

import type { ScrollViewProps } from "./types";

export const ScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  const { active: insideTrueSheet } = useTrueSheetScrollLayout();

  if (isWeb()) {
    const { bottomSheetScrollable: _bottomSheetScrollable, ...webProps } = props;
    void _bottomSheetScrollable;
    return <TamaguiScrollView ref={ref} {...webProps} />;
  }

  const {
    automaticallyAdjustsScrollIndicatorInsets,
    bottomSheetScrollable = true,
    nestedScrollEnabled,
    scrollIndicatorInsets,
    ...restProps
  } = props as ScrollViewProps & {
    nestedScrollEnabled?: boolean;
  };
  void bottomSheetScrollable;
  // 普通 native-stack 页面已位于 header 下方，默认关闭系统的重复 indicator 调整。
  // 不能在这里补窗口 safe-area bottom：该 ScrollView 也可能只是页面中的局部滚动区域。
  // 页面级透明 header / safe-area 避让应显式开启 automaticallyAdjustsScrollIndicatorInsets。
  const manuallyAdjustNormalPageIndicator =
    os() === "ios" && !insideTrueSheet && automaticallyAdjustsScrollIndicatorInsets == null;

  return (
    <ReactNativeScrollView
      ref={ref}
      automaticallyAdjustsScrollIndicatorInsets={
        manuallyAdjustNormalPageIndicator ? false : automaticallyAdjustsScrollIndicatorInsets
      }
      nestedScrollEnabled={nestedScrollEnabled ?? true}
      scrollIndicatorInsets={scrollIndicatorInsets}
      {...(restProps as any)}
    />
  );
});
