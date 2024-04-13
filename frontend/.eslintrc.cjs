module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:boundaries/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    module: true,
    require: true,
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue', 'eslint-plugin-import'],
  settings: {
    'boundaries/elements': [
      { type: 'app', pattern: 'app/*' },
      { type: 'processes', pattern: 'processes/*' },
      { type: 'pages', pattern: 'pages/*' },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'features', pattern: 'features/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'shared', pattern: 'shared/*' },
    ],
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'prefer-const': 'error',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'import/order': [
      'warn',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        'pathGroups': [
          { group: 'internal', position: 'after', pattern: '@/processes/**' },
          { group: 'internal', position: 'after', pattern: '@/pages/**' },
          { group: 'internal', position: 'after', pattern: '@/widgets/**' },
          { group: 'internal', position: 'after', pattern: '@/features/**' },
          { group: 'internal', position: 'after', pattern: '@/entities/**' },
          { group: 'internal', position: 'after', pattern: '@/shared/**' },
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/app/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/processes/*/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/pages/*/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/widgets/*/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/features/*/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/entities/*/**'] },
          { message: 'Private imports are prohibited, use public imports instead', group: ['@/shared/*/*/**'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/app'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/processes'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/pages'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/widgets'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/features'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/entities'] },
          { message: 'Prefer absolut imports instead of relatives (for root modules)', group: ['../**/shared'] },
        ],
      },
    ],
    'boundaries/element-types': [
      'warn',
      {
        default: 'disallow',
        rules: [
          { from: 'app', allow: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'processes', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: 'widgets', allow: ['features', 'entities', 'shared'] },
          { from: 'features', allow: ['entities', 'shared'] },
          { from: 'entities', allow: ['shared'] },
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
  },
}
