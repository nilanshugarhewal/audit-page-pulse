export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-topline">
        <div className="brand-lockup" aria-label="Audit Page Pulse">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>Audit Page Pulse</span>
        </div>
        <span className="hero-code">CHECK / 001</span>
      </div>

      <div className="hero-content">
        <p className="eyebrow">Website health, at a glance</p>
        <h1>Read the pulse of any page.</h1>
        <p className="hero-description">
          Check response health, page structure, and essential on-page signals
          before they become harder to find.
        </p>
      </div>
    </header>
  );
}
