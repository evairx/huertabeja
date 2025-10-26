import { defineAction } from 'astro:actions';
import { getSupabaseClient } from '@/lib/supabase';
import { PROD } from 'astro:env/server';

export const signInGoogle = defineAction({
    handler: async (returnUrl) => {
        try {
            await new Promise((r) => setTimeout(r, 1200));

            const supabase = getSupabaseClient();

            const url = PROD ? 'https://huertabeja-astro.evairx.me' : 'http://localhost:4321';

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${url}/account/callback?return_url=${encodeURIComponent(returnUrl)}`,
                },
            });

            if (error) {
                return { success: false, redirectTo: '/account/login' };
            }

            return { success: true, redirectTo: data.url };
        } catch (error) {
            return { success: false, redirectTo: '/account/login', error: error instanceof Error ? error.message : String(error) };
        }
    }
})