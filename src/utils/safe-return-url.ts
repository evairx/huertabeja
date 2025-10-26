import { PROD } from "astro:env/server";

const allowedHosts = [
  new URL("https://huertabeja-astro.evairx.me").host,
  'localhost:4321'
];

export function safeReturnUrl(url: string) {
  try {
    const decoded = decodeURIComponent(url);

    if (decoded.startsWith('/')) return decoded;

    const parsed = new URL(decoded);

    if (allowedHosts.includes(parsed.host)) return decoded;
  } catch (e) {}

  return PROD ? "https://huertabeja-astro.evairx.me" : "http://localhost:4321";
}