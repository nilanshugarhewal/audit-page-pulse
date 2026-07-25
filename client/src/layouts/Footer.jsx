import "./Footer.css";

export default function Footer() {
    const SOCIAL_LINKS = [
        { label: 'Portfolio', href: 'https://nilanshugarhewal.vercel.app' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nilanshugarhewal' },
        { label: 'GitHub', href: 'https://github.com/NilanshuGarhewal' }
    ];

    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="credit">
                    <a
                        href="https://digitalheroesco.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Built for Digital Heroes Training Task
                    </a>
                </p>

                {SOCIAL_LINKS.length > 0 && (
                    <div className="social-links">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
};