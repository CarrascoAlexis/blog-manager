import { Routes, Route } from 'react-router-dom';
import Template from './components/Template/Template';
import VolumeControl from './components/VolumeControl/VolumeControl';
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import Article from './pages/Article/Article';
import NewArticle from './pages/NewArticle/NewArticle';

function App() {
    return (
        <Template>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/new" element={<NewArticle />} />
                <Route path="*" element={<p>404 Not Found</p>} />
            </Routes>
            <VolumeControl />
        </Template>
    );
}

export default App;
