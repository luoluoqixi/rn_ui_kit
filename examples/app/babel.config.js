module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts",
          disableExtraction: process.env.NODE_ENV === "development",
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-worklets/plugin",
    ],
  };
};
