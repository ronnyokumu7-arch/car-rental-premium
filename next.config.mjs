/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Prevents MIME-sniffing attacks
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Prevents clickjacking (your site being framed)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Controls referrer information sent to other sites
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Forces HTTPS for 1 year (Vercel already provides HTTPS, this enforces it)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // Restricts browser features you don't use
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
};

export default nextConfig;