import type { TamaguiBuildOptions } from "tamagui";

export default {
  components: ["tamagui", "rn-ui-kit"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui.generated.css",
} satisfies TamaguiBuildOptions;
