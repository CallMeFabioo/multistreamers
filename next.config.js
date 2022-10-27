const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true
});

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true
  }
};

// module.exports = withPWA({
//   reactStrictMode: true,
//   experimental: {
//     appDir: true
//   }
// });
