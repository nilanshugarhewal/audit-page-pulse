export default function AuditForm({ url, setUrl, loading, onSubmit }) {
  return (
    <form className="audit-form" onSubmit={onSubmit} aria-busy={loading}>
      <div className="form-field">
        <label htmlFor="audit-url">
          <span className="form-label">Target URL</span>
          <span className="form-meta">public HTML page</span>
        </label>

        <div className="url-control">
          <input
            id="audit-url"
            type="url"
            inputMode="url"
            autoComplete="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            aria-describedby="url-help"
            required
          />
          <span className="input-cue" aria-hidden="true">
            ↵
          </span> 
        </div>

        <p className="form-help" id="url-help">
          We will request the page and return its key health signals.
        </p>
      </div>

      <button type="submit" disabled={loading}>
        <span>{loading ? 'Running audit' : 'Run audit'}</span>
        <span className="button-arrow" aria-hidden="true">
          ↗
        </span>
      </button>
    </form>
  );
}
