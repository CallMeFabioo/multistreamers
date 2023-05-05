const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
module.exports = withAxiom({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'],
  },
});
