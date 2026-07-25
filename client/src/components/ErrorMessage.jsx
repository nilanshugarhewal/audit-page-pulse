export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="diagnostic-alert" role="alert">
      <span className="alert-mark" aria-hidden="true">
        !
      </span>
      <div>
        <p className="alert-label">Audit interrupted</p>
        <p className="alert-message">{error}</p>
      </div>
    </div>
  );
}
