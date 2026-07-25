import { getStatusClass } from '../utils/reportHelpers';
import Cards from './Cards';
import Details from './Details';

function getStatusLabel(status) {
  if (status < 300) return 'Healthy response';
  if (status < 400) return 'Redirected response';
  return 'Needs attention';
}

export default function Report({ report }) {
  if (!report) return null;

  const statusClass = getStatusClass(report.status);

  return (
    <section className="report" aria-label="Audit report" aria-live="polite">
      <div className="report-heading">
        <div>
          <p className="eyebrow">Latest signal</p>
          <h2>Page health snapshot</h2>
        </div>
        <span className={`report-status ${statusClass}`}>
          <span className="status-dot" aria-hidden="true" />
          {getStatusLabel(report.status)}
        </span>
      </div>

      <Cards report={report} />
      <Details report={report} />
    </section>
  );
}
