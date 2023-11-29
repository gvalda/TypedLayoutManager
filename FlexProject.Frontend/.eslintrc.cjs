module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { code: 150 }],
    'no-unused-vars': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    semi: ['error', 'always'],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: { project: [`${__dirname}/tsconfig.json`, `${__dirname}/tsconfig.node.json`] },
    },
  ],
};
