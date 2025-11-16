module.exports = {
  root: true,
  env: { browser: true, es2020: true },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "next/core-web-vitals", // ✔ Recommended by Next.js
  ],

  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "postcss.config.cjs",
    "tailwind.config.js",
    "netlify.toml",
    "scripts/optimize-images.js",
    "public/**/*",
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },

  settings: { react: { version: "18.2" } },

  plugins: ["react-refresh", "react", "@typescript-eslint"],

  rules: {
    // 🔥 Next.js Fast Refresh — disable in SSR components
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // TypeScript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",

    // React
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off", // ✔ Needed for Next.js SEO tags

    // Self-closing behavior
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true, // ✔ HTML tags тоже можно self-close (Next.js любит)
      },
    ],

    // Clean JSX curly braces
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],

    // All components must be arrow functions
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    // 🔥 Disable annoying Next.js rule (you use <img> for public assets)
    "@next/next/no-img-element": "off",
  },

  overrides: [
    {
      files: [
        "src/app/**/layout.tsx",
        "src/app/**/page.tsx",
        "src/app/**/loading.tsx",
        "src/app/**/sitemap.ts",
        "src/context/ThemeContext.tsx",
      ],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
};
