import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © {new Date().getFullYear()} Blog Manager. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
