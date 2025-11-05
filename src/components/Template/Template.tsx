import './Template.template.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Template({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="template-main">{children}</main>
      <Footer />
    </>
  );
}

export default Template;
