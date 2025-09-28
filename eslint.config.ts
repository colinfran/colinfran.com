import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended configs
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules", "dist", ".next"],

    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
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
          extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        },
        alias: {
          map: [
            ["@/components", "./components"],
            ["@/app", "./app"],
            ["@/assets", "./assets"],
            ["@/lib", "./lib"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
        },
      },
    },

    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

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
