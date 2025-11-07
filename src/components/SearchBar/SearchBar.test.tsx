import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render with placeholder text', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search articles...');
    expect(input).toBeInTheDocument();
  });

  it('should display the current search term', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="test query" onSearchChange={mockOnSearch} />);
    
    const input = screen.getByDisplayValue('test query');
    expect(input).toBeInTheDocument();
  });

  it('should call onSearchChange when typing', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search articles...');
    await user.type(input, 'new search');
    
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Search articles by title, content, or author');
  });

  it('should show search icon', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearch} />);
    
    const icon = screen.getByText('search');
    expect(icon).toBeInTheDocument();
  });
});
