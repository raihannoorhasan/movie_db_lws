/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        hostname: "facebook.com",
      },
      {
        hostname: "x.com",
      },
      {
        hostname: "linkedin.com",
      },
      {
        hostname: "web.whatsapp.com",
      },
    ],
  },
};

export default nextConfig;

