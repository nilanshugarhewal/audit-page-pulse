function isHtml(contentType) {
    if (!contentType || !contentType.includes('text/html')) return false;
    return true;
}

module.exports = { isHtml };