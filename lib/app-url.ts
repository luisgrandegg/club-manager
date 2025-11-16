export function getBaseUrl(fallback: string): string {
  return (
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    fallback ??
    "http://localhost:3000"
  );
}
