export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  let normalized = url.trim();
  // If no protocol, default to https
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }
  return normalized;
};

export const extractDomain = (url: string): string => {
  try {
    const normalized = normalizeUrl(url);
    return new URL(normalized).hostname.replace(/^www\./, '');
  } catch (e) {
    return 'unknown';
  }
};
