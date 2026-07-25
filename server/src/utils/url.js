const { ApiError } = require('./ApiError');

function normalizeUrl(input) {
  if (!input || typeof input !== 'string' || !input.trim()) {
    throw new ApiError(
      400,
      'INVALID_URL',
      'URL is required',
      'Example: https://example.com'
    );
  }

  let raw = input.trim();

  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }

  let parsed;

  try {
    parsed = new URL(raw);
  } catch {
    throw new ApiError(
      400,
      'INVALID_URL',
      'That does not look like a valid URL',
      'Example: https://example.com'
    );
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new ApiError(
      400,
      'INVALID_URL',
      'Only http and https URLs are allowed'
    );
  }

  return parsed.toString();
}

function isDangerousUrl(url) {
  try {
    const { hostname } = new URL(url);
    const h = hostname.toLowerCase();

    if (h === 'localhost' || h.endsWith('.localhost')) return true;
    if (h === '0.0.0.0' || h === '::1' || h === '[::1]') return true;

    if (/^127\./.test(h)) return true;
    if (/^10\./.test(h)) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
    if (/^169\.254\./.test(h)) return true;

    if (h.startsWith('fc') || h.startsWith('fd') || h.startsWith('fe80')) {
      return true;
    }

    return false;
  } catch {
    return true;
  }
}

module.exports = { normalizeUrl, isDangerousUrl };