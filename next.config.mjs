/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: false, // as timelines do GSAP e o canvas global não suportam montagem dupla no desenvolvimento
  transpilePackages: ['three'],
  // O instante do build vai igual para o servidor e para o navegador: ofertaNoBuild() dá o mesmo resultado nos dois,
  // também nos componentes de cliente, e a hidratação não troca o que o HTML gerado mostrou.
  env: { OFERTA_AGORA: process.env.OFERTA_AGORA || new Date().toISOString() },
};

export default nextConfig;
