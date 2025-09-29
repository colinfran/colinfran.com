// eslint.config.ts
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    ignores: [
      "node_modules",
      ".DS_Store",
      "dist",
      "dist-ssr",
      "*.local",
      ".eslintcache",
      "/components/ui",
      ".eslintignore",
      ".eslintrc.json",
      ".prettierignore",
      "components.json",
      "middleware.ts",
      "tsconfig.json",
      "tailwind.config.js",
      "postcss.config.js",
      "package.json",
      "package-lock.json",
      "next-env.d.ts",
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        project: true,
        tsconfigRootDir: __dirname,
      },
      globals: {
        React: "writable",
        JSX: "writable",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".d.ts"],
          moduleDirectory: [".", "node_modules"],
        },
        alias: {
          map: [
            ["@/components", "./components"],
            ["@/app", "./app"],
            ["@/assets", "./assets"],
            ["@/lib", "./lib"],
          ],
          extensions: [".ts", ".tsx", ".json", "css"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindPlugin,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },

    extends: [
      "plugin:react/recommended",
      "plugin:import/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "eslint-config-prettier",
      "plugin:prettier/recommended",
      "plugin:tailwindcss/recommended",
      "plugin:@next/next/recommended",
    ],

    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "jsx-a11y/role-supports-aria-props": "off",
      quotes: ["error", "double"],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],

      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],

      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".tsx"],
        },
      ],

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",

      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
    },
  },
]);
