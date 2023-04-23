/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: 'all',
  singleQuote: true,
  importOrder: [
    '^react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '^@utils/(.*)$',
    '^@src/(.*)$',
    '^@hooks/(.*)$',
    '^@components/(.*)$',
    '^@styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
};
