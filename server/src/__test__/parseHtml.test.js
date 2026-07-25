const { parseHtml } = require("../utils/parseHtml");

describe("parseHtml", () => {
    test("extracts SEO information from valid HTML", () => {
        const html = `
            <html>
                <head>
                    <title>My Test Page</title>
                    <meta name="description" content="This is a test page">
                </head>
                <body>
                    <h1>Welcome</h1>
                    <p>Hello world from Page Pulse.</p>

                    <img src="image1.jpg" alt="Logo">
                    <img src="image2.jpg">
                </body>
            </html>
        `;

        const result = parseHtml(html);

        expect(result.title).toBe("My Test Page");
        expect(result.metaDescription).toBe("This is a test page");
        expect(result.h1Count).toBe(1);
        expect(result.imagesMissingAlt).toBe(1);
        expect(result.wordCount).toBeGreaterThan(0);
    });

    test("returns default values for empty HTML", () => {
        const result = parseHtml("");

        expect(result.title).toBeNull();
        expect(result.metaDescription).toBeNull();
        expect(result.h1Count).toBe(0);
        expect(result.imagesMissingAlt).toBe(0);
        expect(result.wordCount).toBe(0);
    });

    test("handles HTML with missing SEO elements", () => {
        const html = `
        <html>
            <body>
                <p>Hello Page Pulse</p>
            </body>
        </html>
    `;

        const result = parseHtml(html);

        expect(result.title).toBeNull();
        expect(result.metaDescription).toBeNull();
        expect(result.h1Count).toBe(0);
        expect(result.imagesMissingAlt).toBe(0);
        expect(result.wordCount).toBeGreaterThan(0);
    });

    test("counts images without alt attributes correctly", () => {
        const html = `
        <html>
            <body>
                <img src="image1.jpg">
                <img src="image2.jpg" alt="">
                <img src="image3.jpg" alt="Logo">
            </body>
        </html>
    `;

        const result = parseHtml(html);

        expect(result.imagesMissingAlt).toBe(2);
    });
});