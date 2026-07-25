import { getStatusClass } from "../utils/reportHelpers";

export default function Cards({ report }) {
    return (
        <div className="cards">
            <div className="card">
                <div className="label">HTTP Status</div>
                <div className={`value ${getStatusClass(report.status)}`}>
                    {report.status}
                </div>
            </div>

            <div className="card">
                <div className="label">Response Time</div>
                <div className="value">{report.responseTimeMs} ms</div>
            </div>

            <div className="card">
                <div className="label">H1 Count</div>
                <div className="value">{report.h1Count}</div>
            </div>

            <div className="card">
                <div className="label">Images Missing Alt</div>
                <div
                    className={`value ${report.imagesMissingAlt > 0 ? 'status-bad' : 'status-ok'
                        }`}
                >
                    {report.imagesMissingAlt}
                </div>
            </div>

            <div className="card">
                <div className="label">Word Count</div>
                <div className="value">{report.wordCount}</div>
            </div>
        </div>
    )
}