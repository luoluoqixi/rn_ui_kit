# rn-ui-kit

The single public package for `rn-ui-kit`. Core implementation lives under
`src/core`, debug tools live under `src/debug`, and the default entry exports
core APIs only. Debug APIs are available from the opt-in `rn-ui-kit/debug`
subpath.

```ts
import "rn-ui-kit/initialize";
import { Button } from "rn-ui-kit";
import { RnUiKitDebugPanel } from "rn-ui-kit/debug";
```

Core is also available from `rn-ui-kit/core`. Applications only need to depend
on `rn-ui-kit`; importing the debug subpath is opt-in.

`RnUiKitDebugPanel` includes an independent navigation container by default for
standalone and sheet usage. When it is rendered inside a host Native Stack,
one prop connects all debug pages to that stack:

```tsx
<RnUiKitDebugPanel
  backButtonLabel="返回"
  navigationMode="host"
/>
```

Host mode manages the debug route state and header options internally. With one
native stack owning every page, iOS preserves scroll-edge header appearance,
transition coordination, interactive back gestures, and the long-press history
menu.

## Native scroll-edge Header

Use the public native-stack helper once at the navigator level, then mark the
single page-level scroll container. Nested scroll containers must not opt in.

```tsx
import { Platform } from "react-native";
import {
  ScrollView,
  getNativeStackScrollEdgeHeaderOptions,
  isIos26Plus,
  useAppBackgroundColors,
} from "rn-ui-kit";

function useScreenOptions() {
  const colors = useAppBackgroundColors();

  return {
    contentStyle: { backgroundColor: colors.screen },
    ...getNativeStackScrollEdgeHeaderOptions({
      screenBackgroundColor: colors.screen,
      headerBackgroundColor: colors.header,
    }),
  };
}

function ScreenContent() {
  return (
    <ScrollView
      tracksNavigationBarScrollEdge
      contentInsetAdjustmentBehavior={
        Platform.OS === "ios" && !isIos26Plus() ? "automatic" : undefined
      }
    >
      {/* content */}
    </ScrollView>
  );
}
```

The same `tracksNavigationBarScrollEdge` prop is available on `NativeList`,
`NativeSheetScrollContent`, and `TrueSheetScrollContent`.

- iOS 15–25 keeps the existing native UIKit scroll-edge appearance.
- iOS 26+ keeps the transparent Header, automatic Liquid Glass effect, native
  back button, and long-press history menu.
- Android keeps `headerTransparent: false`; the Header remains in normal layout
  and switches only between the page background color and Header background
  color when the root scroll container leaves or returns to the top.

Android colors and the threshold can be overridden per scroll container:

```tsx
<ScrollView
  tracksNavigationBarScrollEdge
  navigationBarScrollEdgeOptions={{
    topBackgroundColor: "#f2f2f7",
    scrolledBackgroundColor: "#ffffff",
    topThreshold: 1,
  }}
/>
```
