/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/news/from-number-10-to-number-10",
        destination: "/news/scott-murray-new-kit",
        statusCode: 301,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "qyvwpywlitnlbmzcxzlf.supabase.co", pathname: "/storage/v1/object/public/player-photos/**" },
    ],
  },
};

module.exports = nextConfig;
