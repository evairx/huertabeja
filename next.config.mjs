const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/account/refresh_session",
                destination: "/api/refresh_session",
            },
        ];
    },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
