/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: false, // as timelines do GSAP e o canvas global não suportam montagem dupla no desenvolvimento
  transpilePackages: ['three'],
};

export default nextConfig;
