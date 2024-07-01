module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    project: './tsconfig.json'
  },
  plugins: ['import', 'jest', 'jsdoc', 'json', 'node', 'prettier', 'react', '@typescript-eslint'],
  settings: {
    'import/external-module-folders': ['public'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    jsdoc: {}
  },
  globals: {
    renderHook: 'readonly',
    renderComponent: 'readonly',
    shallowComponent: 'readonly'
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 1,
    'comma-dangle': 0,
    'consistent-return': 1,
    'default-param-last': 0,
    'import/extensions': [
      'error',
      {
        json: 'always'
      }
    ],
    'import/first': 0,
    'import/newline-after-import': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'never'
      }
    ],
    'jest/no-done-callback': 0,
    'jest/no-standalone-expect': [2, { additionalTestBlockFunctions: ['skipIt'] }],
    'jest/prefer-to-have-length': 0,
    'jest/valid-describe-callback': 2,
    'jsdoc/check-tag-names': [
      2,
      {
        definedTags: [
          'api',
          'apiDescription',
          'apiSuccess',
          'apiSuccessExample',
          'apiError',
          'apiErrorExample',
          'apiMock',
          'apiParam'
        ]
      }
    ],
    'jsdoc/no-undefined-types': [2, { definedTypes: ['html'] }],
    'jsdoc/require-jsdoc': 2,
    'jsdoc/require-param': 2,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-param-type': 2,
    'jsdoc/require-property': 2,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-property-name': 2,
    'jsdoc/require-property-type': 2,
    'jsdoc/require-returns': 2,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-returns-type': 2,
    'jsdoc/tag-lines': [
      'warn',
      'always',
      {
        count: 0,
        applyToEndTag: false,
        startLines: 1
      }
    ],
    'max-len': [
      'error',
      {
        code: 240,
        comments: 120,
        ignoreComments: false,
        ignoreUrls: true
      }
    ],
    'no-case-declarations': 0,
    'no-console': 0,
    'no-continue': 0,
    'no-debugger': 1,
    'no-lonely-if': 1,
    'no-plusplus': 0,
    'no-promise-executor-return': 1,
    'no-restricted-exports': [1, { restrictedNamedExports: [] }],
    'no-restricted-properties': [0, { object: 'Math', property: 'pow' }],
    'no-underscore-dangle': 0,
    'no-unsafe-optional-chaining': 1,
    'prefer-exponentiation-operator': 0,
    'prefer-promise-reject-errors': 1,
    'prefer-regex-literals': 0,
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        singleQuote: true,
        trailingComma: 'none',
        printWidth: 120
      }
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
    ],
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-fragments': [1, 'element'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-no-constructed-context-values': 1,
    'react/no-unstable-nested-components': 0,
    'react/jsx-no-useless-fragment': 1,
    'react/require-default-props': 0,
    'react/state-in-constructor': [1, 'never'],
    'space-before-function-paren': 0,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3
      }
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id']
        }
      }
    ]
  }
};
