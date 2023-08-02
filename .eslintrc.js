/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['next','prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules', 'dist', '.next'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
