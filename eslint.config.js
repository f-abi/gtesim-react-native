// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
// prettier
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
// tailwind 检查
const tailwindPlugin = require('eslint-plugin-tailwindcss');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  tailwindPlugin,
  {
    ignores: ['dist/*', 'types/*'],
  },
]);
