import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Article } from '../../shared/interfaces';
import './Home.css';

function Home() {
    const [articles] = useLocalStorage<Article[]>('blog-articles', []);

    const stats = {
        totalArticles: articles.length,
        categories: new Set(articles.map(a => a.category.name)).size,
        totalReadTime: articles.reduce((sum, article) => {
            const minutes = parseInt(article.readTime) || 0;
            return sum + minutes;
        }, 0)
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="material-symbols-outlined hero-icon">article</span>
                        Blog Manager
                    </h1>
                    <p className="hero-subtitle">
                        A modern and elegant tool to manage your blog articles
                    </p>
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

            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">description</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.totalArticles}</div>
                            <div className="stat-label">Articles</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">category</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.categories}</div>
                            <div className="stat-label">Categories</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon material-symbols-outlined">schedule</span>
                        <div className="stat-content">
                            <div className="stat-value">{stats.totalReadTime}</div>
                            <div className="stat-label">Minutes of reading</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">edit_note</span>
                        </div>
                        <h3 className="feature-title">Markdown Editor</h3>
                        <p className="feature-description">
                            Write your articles in Markdown with an intuitive toolbar to easily format your content.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <h3 className="feature-title">Customizable Themes</h3>
                        <p className="feature-description">
                            Choose from 10+ different themes including seasonal themes (Halloween, Christmas) and classic modes.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">label</span>
                        </div>
                        <h3 className="feature-title">Custom Categories</h3>
                        <p className="feature-description">
                            Organize your articles with colorful and customizable categories according to your needs.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <h3 className="feature-title">Search and Filters</h3>
                        <p className="feature-description">
                            Quickly find your articles thanks to real-time search and category filters.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="material-symbols-outlined">save</span>
                        </div>
                        <h3 className="feature-title">Local Storage</h3>
                        <p className="feature-description">
                            Your articles are saved locally in your browser. No server, 100% private data.
                        </p>
                    </div>

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
                    <div className="tech-stack">
                        <h3 className="tech-title">Technologies Used</h3>
                        <div className="tech-tags">
                            <span className="tech-tag">React 18</span>
                            <span className="tech-tag">TypeScript</span>
                            <span className="tech-tag">React Router</span>
                            <span className="tech-tag">CSS3</span>
                            <span className="tech-tag">Vite</span>
                            <span className="tech-tag">localStorage</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start?</h2>
                    <p className="cta-text">
                        Explore existing articles or create your first article right now.
                    </p>
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
