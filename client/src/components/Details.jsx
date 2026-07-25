import { formatValue } from '../utils/reportHelpers';

const DETAILS = [
  { key: 'url', label: 'Requested URL', mono: true },
  { key: 'title', label: 'Page title' },
  { key: 'metaDescription', label: 'Meta description' },
];

export default function Details({ report }) {
  return (
    <section className="details-panel" aria-labelledby="details-heading">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">02 / structure</p>
          <h3 id="details-heading">Page signals</h3>
        </div>
        <span className="panel-note">parsed content</span>
      </div>

      <dl className="details-list">
        {DETAILS.map((detail) => (
          <div className="detail-row" key={detail.key}>
            <dt>{detail.label}</dt>
            <dd className={detail.mono ? 'mono' : ''}>
              {formatValue(report[detail.key])}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
