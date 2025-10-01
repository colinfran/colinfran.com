import tsPlugin from "@typescript-eslint/eslint-plugin"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import prettierPlugin from "eslint-plugin-prettier"
import tailwindcssPlugin from "eslint-plugin-tailwindcss"
import unusedImportsPlugin from "eslint-plugin-unused-imports"
import nextPlugin from "@next/eslint-plugin-next"
import tsParser from "@typescript-eslint/parser"

import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

export default [
  // Apply Next.js core-web-vitals rules via FlatCompat
   ...compat.config({
    extends: ['next/core-web-vitals'],
  }),

  // Global ignores
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "./components/ui/**", "eslint.config.mjs", "postcss.config.mjs", "tailwind.config.mjs" ],
  },

  // TypeScript + React + Next.js rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
    },

    // ✅ Plugins must be objects, not strings
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
      "unused-imports": unusedImportsPlugin,
      "@typescript-eslint": tsPlugin,
      next: nextPlugin,
    },

    rules: {
      "@next/next/no-img-element": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "jsx-a11y/role-supports-aria-props": 0,
      quotes: ["error", "double"],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/function-component-definition": [
        2,
        { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
      ],
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "react/jsx-sort-props": [
        2,
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
]
