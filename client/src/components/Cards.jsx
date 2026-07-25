import { getStatusClass } from '../utils/reportHelpers';

const METRICS = [
  { key: 'status', label: 'HTTP status' },
  { key: 'responseTimeMs', label: 'Response time', suffix: ' ms' },
  { key: 'h1Count', label: 'H1 count' },
  { key: 'imagesMissingAlt', label: 'Images missing alt' },
  { key: 'wordCount', label: 'Word count' },
];

function getMetricTone(metric, report) {
  if (metric.key === 'status') return getStatusClass(report.status);
  if (metric.key === 'imagesMissingAlt') {
    return report.imagesMissingAlt > 0 ? 'status-bad' : 'status-ok';
  }
  return 'status-neutral';
}

function getMetricValue(metric, report) {
  const value = report[metric.key];
  return `${value ?? '—'}${metric.suffix ?? ''}`;
}

export default function Cards({ report }) {
  return (
    <section className="metrics-panel" aria-labelledby="metrics-heading">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">01 / response</p>
          <h3 id="metrics-heading">Core signals</h3>
        </div>
        <span className="panel-note">live result</span>
      </div>

      <dl className="metrics-grid">
        {METRICS.map((metric) => (
          <div className="metric" key={metric.key}>
            <dt>
              <span
                className={`metric-marker ${getMetricTone(metric, report)}`}
                aria-hidden="true"
              />
              {metric.label}
            </dt>
            <dd className={getMetricTone(metric, report)}>
              {getMetricValue(metric, report)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
