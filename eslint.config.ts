// .eslintrc.cjs or .eslintrc.js
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import prettierPlugin from "eslint-plugin-prettier"
import tailwindcss from "eslint-plugin-tailwindcss"
import unusedImports from "eslint-plugin-unused-imports"
import next from "@next/eslint-plugin-next"

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "dist-ssr/**",
      "build/**",
      ".DS_Store",
      "*.local",
      ".eslintcache",
      "components/ui/**",
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
  },

  // TypeScript files
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
      "react-hooks": reactHooks,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      prettier: prettierPlugin,
      tailwindcss,
      "unused-imports": unusedImports,
      "@typescript-eslint": tsPlugin,
      next,
    },

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
      "jsx-a11y/role-supports-aria-props": 0,
      quotes: ["error", "double"],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/function-component-definition": [
        2,
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
