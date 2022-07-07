module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:import/typescript',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'react-hooks',
    'import',
    'simple-import-sort',
    'jest',
    'testing-library',
  ],
  ignorePatterns: ['dist/'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
        readonly: 'array-simple',
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'prettier/prettier': 'error',
    'no-nested-ternary': 'error',
    'react/self-closing-comp': 'warn',
    'react/button-has-type': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'arrow-body-style': 'error',
    'jest/no-focused-tests': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    'import/order': 'error',
    'import/namespace': 'off',
    'import/no-named-as-default': 0,
    'object-shorthand': 'error',
    'dot-notation': 'error',
    'no-caller': 'error',
    'no-useless-concat': 'error',
    radix: 'error',
    yoda: 'error',
    'prefer-arrow-callback': 'error',
    'prefer-rest-params': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'no-shadow': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { array: false, object: true }],
    'default-case': 'error',
    'react/no-deprecated': ['error'],
    indent: 'off',
    'react/display-name': ['off'],
    'react/prop-types': ['off'],
    'jest/expect-expect': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
          ['^\\u0000'],
          ['^.+\\.s?css$'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*', './webpack/*.config.js'],
      rules: {
        'testing-library/prefer-user-event': 'error',
        'testing-library/no-await-sync-events': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debugging-utils': 'error',
        'testing-library/no-dom-import': 'error',
        'testing-library/no-promise-in-fire-event': 'error',
        'testing-library/no-unnecessary-act': 'error',
        'testing-library/prefer-find-by': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
