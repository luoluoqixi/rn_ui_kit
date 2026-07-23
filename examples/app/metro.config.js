const { getDefaultConfig } = require("expo/metro-config");

const isProd = process.env.NODE_ENV === "production";
console.log(`metro prod: ${isProd}`);

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
};

if (isProd) {
  config.cacheStores = [];
}

module.exports = config;
