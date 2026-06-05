/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/db', '@repo/consent', '@repo/events', '@repo/audiences', '@repo/identity', '@repo/queue'],
};

module.exports = nextConfig;