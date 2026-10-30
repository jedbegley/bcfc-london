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
  async headers() {
    return [{source:"/dashboard/news/:path*",headers:[{key:"Cache-Control",value:"private, no-store, max-age=0"},{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}]},{source: "/sw.js", headers: [{key: "Cache-Control", value: "no-cache, no-store, must-revalidate"}]}];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "qyvwpywlitnlbmzcxzlf.supabase.co", pathname: "/storage/v1/object/public/player-photos/**" },
    ],
  },
};

module.exports = nextConfig;
