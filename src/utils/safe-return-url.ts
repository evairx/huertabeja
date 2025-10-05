const allowedHosts = [process.env.NEXT_PUBLIC_URL_BASE, 'localhost:3000'];

export function safeReturnUrl(url: string) {
  try {
    if (url.startsWith('/')) return url;
    const parsed = new URL(url);

    if (allowedHosts.includes(parsed.host)) return url;
  } catch (e) {}

  return `${process.env.NEXT_PUBLIC_URL_BASE}/`
}
