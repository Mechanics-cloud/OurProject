/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  reactStrictMode: true,
}

export default nextConfig
