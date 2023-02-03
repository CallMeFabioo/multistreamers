/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      height: {
        'stream-item': 'calc(100vh - 46px)',
      },
    },
  },
  plugins: [
    require.resolve('@tailwindcss/forms'),
    require.resolve('flowbite/plugin'),
  ],
};
