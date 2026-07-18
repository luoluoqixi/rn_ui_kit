import "rn-ui-kit/initialize";
import { Button, type ButtonProps } from "rn-ui-kit";
import { RnUiKitDebugPanel, type RnUiKitDebugPanelProps } from "rn-ui-kit/debug";

void Button;
void RnUiKitDebugPanel;

type PublicCoreProps = ButtonProps;
type PublicDebugProps = RnUiKitDebugPanelProps;

export type { PublicCoreProps, PublicDebugProps };
