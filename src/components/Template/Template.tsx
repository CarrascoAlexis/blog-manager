import './Template.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * Template component that provides consistent layout structure for all pages
 * Includes Header at top, main content area in middle, and Footer at bottom
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render in the main area
 */
function Template({ children }: { children?: React.ReactNode }) {
    return (
        <>
            {/* Navigation header appears on all pages */}
            <Header />
            {/* Main content wrapper with consistent styling */}
            <main className="template-main">
                <div className="template-content">{children}</div>
            </main>
            {/* Footer appears on all pages */}
            <Footer />
        </>
    );
}

export default Template;
