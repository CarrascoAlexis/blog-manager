import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import type { Article } from '../../shared/interfaces';

// Mock article data
const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    excerpt: 'This is a test excerpt for the article',
    author: 'John Doe',
    date: '2024-01-15',
    category: {
        id: 'tech',
        name: 'Technology',
        color: '#3b82f6'
    },
    readTime: '5 min',
    content: 'Full article content here'
};

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ArticleCard', () => {
    it('renders article information correctly', () => {
        renderWithRouter(<ArticleCard article={mockArticle} />);

        expect(screen.getByText('Test Article')).toBeInTheDocument();
        expect(screen.getByText('This is a test excerpt for the article')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Technology')).toBeInTheDocument();
        expect(screen.getByText('5 min')).toBeInTheDocument();
    });

    it('formats date correctly', () => {
        renderWithRouter(<ArticleCard article={mockArticle} />);
        
        // Date should be formatted like "Jan 15, 2024"
        expect(screen.getByText(/jan 15, 2024/i)).toBeInTheDocument();
    });

    it('applies category color to badge', () => {
        renderWithRouter(<ArticleCard article={mockArticle} />);
        
        const categoryBadge = screen.getByText('Technology');
        expect(categoryBadge).toHaveStyle({ backgroundColor: '#3b82f6' });
    });

    it('renders link to article detail page', () => {
        renderWithRouter(<ArticleCard article={mockArticle} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/articles/1');
    });

    it('renders with article without optional fields', () => {
        const minimalArticle: Article = {
            id: '2',
            title: 'Minimal Article',
            excerpt: 'Basic excerpt',
            author: 'Jane Smith',
            date: '2024-02-01',
            category: {
                id: 'news',
                name: 'News'
            },
            readTime: '3 min'
        };

        renderWithRouter(<ArticleCard article={minimalArticle} />);

        expect(screen.getByText('Minimal Article')).toBeInTheDocument();
        expect(screen.getByText('News')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        renderWithRouter(<ArticleCard article={mockArticle} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('aria-label', 'Read article: Test Article');
    });
});
