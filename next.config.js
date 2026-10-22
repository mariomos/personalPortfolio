/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is HTML on a CDN. This is also why the
  // contact section is links rather than a form - see components/sections/contact.tsx.
  output: "export",
  images: {
    // No image optimisation server exists in a static export.
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
