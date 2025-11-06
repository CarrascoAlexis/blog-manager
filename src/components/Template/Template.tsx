import './Template.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Template({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="template-main">
                <div className="template-content">{children}</div>
            </main>
            <Footer />
        </>
    );
}

export default Template;
