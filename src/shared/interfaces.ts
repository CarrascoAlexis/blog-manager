import React from 'react';

/**
 * Props interface for the ThemeProvider component
 */
export interface ThemeProviderProps {
    children: React.ReactNode; // Child components to wrap
}

/**
 * Interface representing an article category
 */
export interface category {
    id: string; // Unique identifier
    name: string; // Display name of the category
    description?: string; // Optional description
    color?: string; // Optional color for visual distinction
}

/**
 * Interface representing a blog article
 */
export interface Article {
    id: string; // Unique identifier (UUID)
    title: string; // Article title
    excerpt: string; // Short summary/preview
    author: string; // Author name
    date: string; // Publication date (ISO format)
    category: category; // Associated category object
    readTime: string; // Estimated reading time (e.g., "5 min")
    content?: string; // Full article content in Markdown format
    creationDate?: string; // Optional creation timestamp
    updatedAt?: string; // Optional last update timestamp
}

/**
 * Interface representing a draft article
 */
export interface Draft {
    id: string; // Unique identifier (UUID)
    title: string; // Draft title
    excerpt: string; // Short summary/preview
    author: string; // Author name
    category: category; // Associated category object
    content?: string; // Draft content in Markdown format
    createdAt: string; // Creation timestamp
    updatedAt: string; // Last update timestamp
}

/**
 * Props interface for ArticleCard component
 */
export interface ArticleCardProps {
    article: Article; // Article data to display
}
