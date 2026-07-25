const cheerio = require('cheerio');

function parseHtml(html) {
    const page = cheerio.load(html);

    // removing unnecesssary tags
    page('script, style, noscript, template, svg, iframe').remove();

    const title = page('title').first().text().trim() || null;

    const metaDescription =
        page('meta[name="description"]').attr('content')?.trim() || null;

    const h1Count = page('h1').length;

    let imagesMissingAlt = 0;

    page('img').each((_, el) => {
        const alt = page(el).attr('alt');

        if (!alt || !alt.trim()) {
            imagesMissingAlt++;
        }
    });

    const text = page('body').text() || page.root().text() || '';
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    return {
        title,
        metaDescription,
        h1Count,
        imagesMissingAlt,
        wordCount,
    };
}

module.exports = { parseHtml };