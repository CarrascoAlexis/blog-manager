import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Article } from '../../shared/interfaces';
import './Home.css';

/**
 * Home page component that serves as the landing page
 * Displays hero section, statistics, features, tech stack, and call-to-action
 */
function Home() {
    // Load articles from localStorage to calculate statistics
    const [articles] = useLocalStorage<Article[]>('blog-articles', []);

    // Calculate statistics from articles
    const stats = {
        totalArticles: articles.length,  // Total number of articles
        categories: new Set(articles.map(a => a.category.name)).size,  // Unique categories count
        totalReadTime: articles.reduce((sum, article) => {
            // Sum up all article read times (parse minutes from string)
            const minutes = parseInt(article.readTime) || 0;
            return sum + minutes;
        }, 0)
    };

    return (
        <div className="home-page">
            {/* Hero section - main attention grabber */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="material-symbols-outlined hero-icon">article</span>
                        Blog Manager
                    </h1>
                    <p className="hero-subtitle">
                        A modern and elegant tool to manage your blog articles
                    </p>
                    {/* Primary action buttons */}
                    <div className="hero-actions">
                        <Link to="/articles" className="btn-primary">
                            <span className="material-symbols-outlined">explore</span>
                            View Articles
                        </Link>
                        <Link to="/new" className="btn-secondary">
                            <span className="material-symbols-outlined">add</span>
                            Create Article
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistics section - shows key metrics */}
            <section className="stats-section">
                <div className="stats-grid">
                    {/* Total articles stat card */}
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">description</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.totalArticles}</div>
                            <div className="stat-label">Articles</div>
                        </div>
                    </div>
                    {/* Total categories stat card */}
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">category</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.categories}</div>
                            <div className="stat-label">Categories</div>
                        </div>
                    </div>
                    {/* Total read time stat card */}
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">schedule</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.totalReadTime}</div>
                            <div className="stat-label">Minutes of reading</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features section - highlights key application features */}
            <section className="features-section">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    {/* Markdown editor feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">edit_note</span>
                        </div>
                        <h3 className="feature-title">Markdown Editor</h3>
                        <p className="feature-description">
                            Write your articles in Markdown with an intuitive toolbar to easily format your content.
                        </p>
                    </div>

                    {/* Customizable themes feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <h3 className="feature-title">Customizable Themes</h3>
                        <p className="feature-description">
                            Choose from 10+ different themes including seasonal themes (Halloween, Christmas) and classic modes.
                        </p>
                    </div>

                    {/* Custom categories feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">label</span>
                        </div>
                        <h3 className="feature-title">Custom Categories</h3>
                        <p className="feature-description">
                            Organize your articles with colorful and customizable categories according to your needs.
                        </p>
                    </div>

                    {/* Search and filters feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <h3 className="feature-title">Search and Filters</h3>
                        <p className="feature-description">
                            Quickly find your articles thanks to real-time search and category filters.
                        </p>
                    </div>

                    {/* Local storage feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">save</span>
                        </div>
                        <h3 className="feature-title">Local Storage</h3>
                        <p className="feature-description">
                            Your articles are saved locally in your browser. No server, 100% private data.
                        </p>
                    </div>

                    {/* Responsive design feature */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">devices</span>
                        </div>
                        <h3 className="feature-title">Responsive Design</h3>
                        <p className="feature-description">
                            Interface optimized for all devices: computer, tablet and smartphone.
                        </p>
                    </div>
                </div>
            </section>

            {/* About section - project description and tech stack */}
            <section className="about-section">
                <div className="about-content">
                    <h2 className="section-title">About the Project</h2>
                    <p className="about-text">
                        <strong>Blog Manager</strong> is a blog article management tool developed with React and TypeScript. 
                        It offers a modern and smooth user experience to create, edit, organize and view your articles.
                    </p>
                    <p className="about-text">
                        All your data is stored locally in your browser using localStorage, 
                        ensuring complete privacy and offline functionality.
                    </p>
                    {/* Technologies used with clickable links to documentation */}
                    <div className="tech-stack">
                        <h3 className="tech-title">Technologies Used</h3>
                        <div className="tech-tags">
                            {/* Each tech tag is a link to official documentation */}
                            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="tech-tag">React 18</a>
                            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="tech-tag">TypeScript</a>
                            <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer" className="tech-tag">React Router</a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="tech-tag">CSS3</a>
                            <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="tech-tag">Vite</a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer" className="tech-tag">localStorage</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-action section - encourages user engagement */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start?</h2>
                    <p className="cta-text">
                        Explore existing articles or create your first article right now.
                    </p>
                    {/* Action buttons */}
                    <div className="cta-actions">
                        <Link to="/articles" className="btn-primary">
                            <span className="material-symbols-outlined">explore</span>
                            Browse Articles
                        </Link>
                        <Link to="/new" className="btn-outline">
                            <span className="material-symbols-outlined">edit</span>
                            Create Article
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
