import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  const mockCategories = ['Technology', 'Travel', 'Food'];

  it('should render all categories', () => {
    const mockOnChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onCategoryChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('should call onCategoryChange when clicking a category', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onCategoryChange={mockOnChange}
      />
    );
    
    const techButton = screen.getByText('Technology');
    await user.click(techButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('Technology');
  });

  it('should apply active state to selected category', () => {
    const mockOnChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Technology"
        onCategoryChange={mockOnChange}
      />
    );
    
    const techButton = screen.getByText('Technology');
    expect(techButton).toHaveAttribute('aria-pressed', 'true');
    expect(techButton).toHaveClass('active');
  });

  it('should have proper accessibility attributes', () => {
    const mockOnChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onCategoryChange={mockOnChange}
      />
    );
    
    const filterGroup = screen.getByRole('group');
    expect(filterGroup).toHaveAttribute('aria-label', 'Filter articles by category');
  });

  it('should have aria-label for each category button', () => {
    const mockOnChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onCategoryChange={mockOnChange}
      />
    );
    
    const techButton = screen.getByLabelText('Filter by Technology category');
    expect(techButton).toBeInTheDocument();
  });
});
