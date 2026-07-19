import "rn-ui-kit/initialize";
import { Button, type ButtonProps } from "rn-ui-kit";
import { RnUiKitDebugPanel, type RnUiKitDebugPanelProps } from "rn-ui-kit/debug";

void Button;
void RnUiKitDebugPanel;

type PublicCoreProps = ButtonProps;
type PublicDebugProps = RnUiKitDebugPanelProps;

const hostPanelProps = {
  backButtonLabel: "返回",
  navigationMode: "host",
} satisfies RnUiKitDebugPanelProps;

void hostPanelProps;

export type { PublicCoreProps, PublicDebugProps };
