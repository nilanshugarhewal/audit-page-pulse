export default function AuditForm({ url, setUrl, loading, onSubmit }) {
    return (
        <form className="audit-form" onSubmit={onSubmit}>
            <input
                type="text"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com"
                aria-label="URL to audit"
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Auditing...' : 'Audit URL'}
            </button>
        </form>
    )
}