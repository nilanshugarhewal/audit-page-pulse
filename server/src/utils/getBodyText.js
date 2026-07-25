function getBodyText(data) {
    if (typeof data === 'string') return data;
    if (data === null || data === undefined) return '';
    return String(data);
}

module.exports = { getBodyText };