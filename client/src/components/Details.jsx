import { formatValue } from "../utils/reportHelpers";

export default function Details({ report }) {
    return (
        <div className="details">
            <div className="detail">
                <div className="label">Requested URL</div>
                <div className="muted">{formatValue(report.url)}</div>
            </div>

            <div className="detail">
                <div className="label">Page Title</div>
                <div className="muted">{formatValue(report.title)}</div>
            </div>

            <div className="detail">
                <div className="label">Meta Description</div>
                <div className="muted">
                    {formatValue(report.metaDescription)}
                </div>
            </div>
        </div>
    )
}