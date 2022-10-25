/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {
      height: {
        chat: 'calc(100vh - 120px)',
        'stream-item': 'calc(50vh - 45px)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
