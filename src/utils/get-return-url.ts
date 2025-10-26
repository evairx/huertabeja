import { PROD } from "astro:env/server";

export function getReturnUrl({ path }: { path: string }): string {
    const baseUrl = PROD ? "https://huertabeja-astro.evairx.me" : "http://localhost:4321";
    const url = `/account/login?return_url=${encodeURIComponent(baseUrl + path)}`;
    return url;
}