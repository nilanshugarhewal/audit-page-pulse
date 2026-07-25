export function getStatusClass(status) {
    if (status < 300) return 'status-ok';
    if (status < 400) return 'status-warn';
    return 'status-bad';
}

export function formatValue(value) {
    if (value === null || value === undefined || value === '') {
        return '—';
    }

    return value;
}