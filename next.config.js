/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xlvjgjhetfrtaigrimtd.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
