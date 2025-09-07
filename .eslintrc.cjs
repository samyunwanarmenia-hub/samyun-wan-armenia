module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended', // Add React specific rules
    'plugin:react/jsx-runtime', // Use new JSX transform rules
    "eslint-config-next" // Add Next.js specific rules
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.cjs', 'tailwind.config.js', 'netlify.toml', 'scripts/optimize-images.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn', // Set no-explicit-any to warn
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'react/self-closing-comp': ['error', {
      component: true,
      html: false, // Изменено на false, чтобы разрешить <span></span>
    }],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: [
        'src/app/**/layout.tsx',
        'src/app/**/page.tsx',
        'src/app/sitemap.ts',
        'src/context/ThemeContext.tsx', // Added to ignore Fast Refresh warning
      ],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
};