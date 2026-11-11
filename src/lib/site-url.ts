export function getSiteUrl() {
  const configuredUrl =
    process.env.APP_URL?.trim() || process.env.SITE_URL?.trim();
  if (configuredUrl) {
    const hasProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(configuredUrl);
    return new URL(hasProtocol ? configuredUrl : `https://${configuredUrl}`);
  }

  return new URL('http://localhost:3000');
}
