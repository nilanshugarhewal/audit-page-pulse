const axios = require('axios');
const { ApiError } = require('../utils/ApiError');

// Helper Functions
const { normalizeUrl, isDangerousUrl } = require('../utils/url');
const { mapAxiosError } = require('../utils/mapAxiosError');
const { getBodyText } = require('../utils/getBodyText');
const { isHtml } = require('../utils/isHtml');
const { parseHtml } = require('../utils/parseHtml');

const fetchTimeoutMs = 8000; // 8 seconds
const maxContentBytes = 5 * 1024 * 1024; // approx 5MB

async function auditPage(inputUrl) {

    // normalizing link
    const url = normalizeUrl(inputUrl);

    // checking if the link is valid
    if (isDangerousUrl(url)) {
        throw new ApiError(
            400,
            'BLOCKED_URL',
            'Localhost/private URLs are not allowed',
        );
    }

    const startedAt = Date.now();
    let response;

    // trying to fetch the url
    try {
        response = await axios.get(url, {
            timeout: fetchTimeoutMs,
            maxRedirects: 5,
            maxContentLength: maxContentBytes,
            responseType: 'text',
            validateStatus: () => true,
            headers: {
                'User-Agent': 'PagePulse1.0',
                Accept: 'text/html',
            },
        });
    } catch (error) {
        throw mapAxiosError(error, url);
    }

    const responseTimeMs = Date.now() - startedAt;

    const contentType = response.headers['content-type'];

    if (!contentType?.includes('text/html')) {
        throw new ApiError(
            400,
            'INVALID_CONTENT',
            'The URL does not point to an HTML page.'
        );
    }

    const body = getBodyText(response.data);

    // checking if the response is html
    if (!isHtml(contentType, body)) {
        throw new ApiError(
            415,
            'NON_HTML_RESPONSE',
            `The URL returned a non-HTML response${contentType ? `: ${contentType}` : ''}`,
        );
    }

    // parsing the html
    const parsed = parseHtml(body);

    return {
        url,
        status: response.status,
        responseTimeMs,
        title: parsed.title,
        metaDescription: parsed.metaDescription,
        h1Count: parsed.h1Count,
        imagesMissingAlt: parsed.imagesMissingAlt,
        wordCount: parsed.wordCount,
    };
}

module.exports = { auditPage };