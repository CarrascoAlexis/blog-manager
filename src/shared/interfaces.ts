import React from 'react';

export interface ThemeProviderProps {
    children: React.ReactNode;
}

export interface category {
    id: string;
    name: string;
    description?: string;
    color?: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: category;
    readTime: string;
    content?: string;
    creationDate ?: string;
    updatedAt?: string;
}

export interface ArticleCardProps {
    article: Article;
}
