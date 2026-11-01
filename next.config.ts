import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical host is the apex domain (canonicals, sitemap, schema all use it).
      // Send www to apex in one permanent hop so Google sees a single host.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lasvegasstriphighrises.com' }],
        destination: 'https://lasvegasstriphighrises.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
