import "rn_ui_kit/initialize";
import {
  Button,
  type ButtonProps,
} from "rn_ui_kit";
import { RnUiKitDebugPanel, type RnUiKitDebugPanelProps } from "rn_ui_kit/debug";

void Button;
void RnUiKitDebugPanel;

type PublicCoreProps = ButtonProps;
type PublicDebugProps = RnUiKitDebugPanelProps;

export type { PublicCoreProps, PublicDebugProps };
