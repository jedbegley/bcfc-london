/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "qyvwpywlitnlbmzcxzlf.supabase.co", pathname: "/storage/v1/object/public/player-photos/**" },
    ],
  },
};

module.exports = nextConfig;
