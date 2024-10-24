/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
  reactStrictMode: true,
}

export default nextConfig
