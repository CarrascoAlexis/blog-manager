import { Routes, Route } from 'react-router-dom';
import Template from './components/Template/Template';
import VolumeControl from './components/VolumeControl/VolumeControl';

function App() {
    return (
        <Template>
            <Routes>
                <Route index element={<p>Accueil</p>} />
            </Routes>
            <VolumeControl />
        </Template>
    );
}

export default App;
