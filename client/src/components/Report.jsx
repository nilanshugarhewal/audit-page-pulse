import Cards from "./Cards";
import Details from "./Details";

export default function Report({ report }) {

    if (!report) return null;

    return (
        <section className="report">
            <Cards
                report={report}
            />

            <Details
                report={report}
            />
        </section>
    )
}