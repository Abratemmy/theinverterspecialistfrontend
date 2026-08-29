import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ng.jumia.is",
            },

            {
                protocol: "https",
                hostname: "d21d281c1yd2en.cloudfront.net",
            },

            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "servostore.ng",
                pathname: "/wp-content/uploads/**",
            },

            // ====================================================
            // LOCAL BACKEND IMAGE UPLOADS
            // ====================================================

            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/api/uploads/**",
            },
           
        ],
    },
};


export default nextConfig;