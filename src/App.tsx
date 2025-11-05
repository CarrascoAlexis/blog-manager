import { Routes, Route, Navigate } from 'react-router-dom';
import Template from './components/Template/Template';

function Home() {
  return <div>Home page</div>;
}

function About() {
  return <div>About page</div>;
}

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Template>
  );
}

export default App;
