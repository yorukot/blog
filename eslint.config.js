// eslint.config.mjs
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,cjs,mjs,ts,astro}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...js.configs.recommended.languageOptions.globals,
      },
    },
  },
  js.configs.recommended,
  tsPlugin.configs.recommended,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
  astroPlugin.configs.recommended,
  astroPlugin.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroPlugin.parser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "**/*.d.ts"],
  },
]);
