import { isIos26Plus, os } from "../platform";
/**
 * iOS 26 的透明导航栏默认返回按钮在部分场景下不会正确应用 `headerTintColor`。
 * 这里统一降级为原生 header item，并把系统版本判断收口在一个入口里。
 */
export function withNativeBackButton(screenOptions, options) {
    if (os() !== "ios" ||
        !isIos26Plus() ||
        screenOptions.unstable_headerLeftItems != null ||
        screenOptions.headerLeft != null) {
        return screenOptions;
    }
    let inferredLabel;
    return {
        ...screenOptions,
        headerBackVisible: false,
        // unstable_headerLeftItems 的参数没有上一页标题；headerLeft 会先收到完整的 back props，
        // 即使最终由原生 item 覆盖，也可用它把系统推导的标题传给 iOS 26 原生按钮。
        ...(options.label == null
            ? {
                headerLeft: ({ label }) => {
                    inferredLabel = label;
                    return null;
                },
            }
            : {}),
        unstable_headerLeftItems: ({ canGoBack, tintColor }) => {
            if (!canGoBack) {
                return [];
            }
            return [
                {
                    type: "button",
                    label: options.label ?? inferredLabel ?? options.fallbackLabel ?? "返回",
                    icon: { type: "sfSymbol", name: "chevron.left" },
                    onPress: options.onPress,
                    tintColor,
                },
            ];
        },
    };
}
