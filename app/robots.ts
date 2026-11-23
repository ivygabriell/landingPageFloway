import type { MetadataRoute } from 'next';

// Tudo bloqueado até a pessoa decidir publicar (R-11, spec 5).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
