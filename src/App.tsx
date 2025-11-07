// Import routing utilities from React Router
import { Routes, Route } from 'react-router-dom';
// Import core layout component
import Template from './components/Template/Template';
// Import volume control component for theme music
import VolumeControl from './components/VolumeControl/VolumeControl';
// Import page components
import Home from './pages/Home/Home';
import Articles from './pages/Articles/Articles';
import Article from './pages/Article/Article';
import NewArticle from './pages/NewArticle/NewArticle';

/**
 * Main App component that defines application routing structure
 * Wraps all routes in a Template layout and includes VolumeControl
 */
function App() {
    return (
        <>
            {/* Skip to main content link for keyboard users */}
            <a href="#main-content" className="skip-to-main">
                Skip to main content
            </a>
            
            <Template>
                {/* Define application routes */}
                <main id="main-content">
                    <Routes>
                        {/* Home page route */}
                        <Route index element={<Home />} />
                        {/* Articles listing page */}
                        <Route path="/articles" element={<Articles />} />
                        {/* Individual article detail page with dynamic ID parameter */}
                        <Route path="/articles/:id" element={<Article />} />
                        {/* Create new article page */}
                        <Route path="/new" element={<NewArticle />} />
                        {/* Catch-all route for 404 Not Found */}
                        <Route path="*" element={<div role="alert"><p>404 Not Found</p></div>} />
                    </Routes>
                </main>
                {/* Volume control appears on all pages for theme music */}
                <VolumeControl />
            </Template>
        </>
    );
}

export default App;
