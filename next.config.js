/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pastikan Next.js tidak memproses FormData di route /api/upload
  api: {
    bodyParser: false,
  },
  // Izinkan semua origin (jika mau upload dari domain lain)
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
