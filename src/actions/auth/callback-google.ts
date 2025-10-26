import { defineAction } from 'astro:actions';
import { safeReturnUrl } from '@/utils/safe-return-url';

export const callbackGoogle = defineAction({
    handler: async (data, context) => {
        try {
            const now = Math.floor(Date.now() / 1000);
            const maxAge = data.at_expires_at - now;

            context.cookies.set('sid', data?.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
                maxAge: maxAge,
            });

            context.cookies.set('rid', data?.refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
            });

            return { success: true, redirectTo: safeReturnUrl(data?.returnUrl ? data?.returnUrl : '') };   
        } catch {
            return { success: false, redirectTo: '/account/login' };
        }
    }
})