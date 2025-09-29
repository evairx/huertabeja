const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/account/refresh_session",
                destination: "/api/refresh_session",
            },
        ];
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
