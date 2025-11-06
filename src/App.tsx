import { Routes, Route, Navigate } from 'react-router-dom';
import Template from './components/Template/Template';

function App() {
  return (
    <Template>
      <Routes>
        <Route index element={<p>Accueil</p>} />
      </Routes>
    </Template>
  );
}

export default App;
