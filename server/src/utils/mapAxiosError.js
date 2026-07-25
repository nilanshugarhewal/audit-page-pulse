const { ApiError } = require('./ApiError');

function mapAxiosError(error) {
    if (error.code === 'ECONNABORTED') {
        return new ApiError(
            504,
            'TIMEOUT',
            'The request timed out.'
        );
    }

    if (error.code === 'ENOTFOUND') {
        return new ApiError(
            400,
            'INVALID_URL',
            'Could not reach the website.'
        );
    }

    return new ApiError(
        500,
        'FETCH_ERROR',
        'Failed to fetch the webpage.'
    );
}

module.exports = { mapAxiosError };