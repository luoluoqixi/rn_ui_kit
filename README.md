# rn_ui_kit

The public package for `rn_ui_kit`. Its default entry exports core APIs; debug APIs
are available from the `rn_ui_kit/debug` subpath.

```ts
import "rn_ui_kit/initialize";
import { Button } from "rn_ui_kit";
import { RnUiKitDebugPanel } from "rn_ui_kit/debug";
```

Core is also available from `rn_ui_kit/core`. Applications only need to depend
on `rn_ui_kit`; importing the debug subpath is opt-in.
