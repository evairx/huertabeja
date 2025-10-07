const allowedHosts = [
  new URL(process.env.NEXT_PUBLIC_URL_BASE ?? '').host,
  'localhost:3000'
];

export function safeReturnUrl(url: string) {
  try {
    const decoded = decodeURIComponent(url);

    if (decoded.startsWith('/')) return decoded;

    const parsed = new URL(decoded);

    if (allowedHosts.includes(parsed.host)) return decoded;
  } catch (e) {}

  return process.env.NEXT_PUBLIC_URL_BASE;
}
