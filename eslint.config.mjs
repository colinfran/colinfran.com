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

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "./components/ui/**",
      "eslint.config.mjs",
      "postcss.config.mjs",
      "tailwind.config.mjs",
    ],
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

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
      "unused-imports": unusedImportsPlugin,
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },

    rules: {
      // Next.js
      "@next/next/no-img-element": "warn",

      // Unused imports
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

      // Prettier
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // Accessibility
      "jsx-a11y/role-supports-aria-props": "off",

      // Style
      quotes: ["error", "double"],

      // Variables
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],

      // Functions
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],

      // React
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".tsx"] },
      ],
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

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Imports
      "import/prefer-default-export": "off",
    },
  },
]