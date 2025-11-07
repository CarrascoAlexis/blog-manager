import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortDropdown from './SortDropdown';

describe('SortDropdown', () => {
  it('should render with current sort option', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown sortBy="date-newest" onSortChange={mockOnSort} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('date-newest');
  });

  it('should render all sort options', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown sortBy="date-newest" onSortChange={mockOnSort} />);
    
    expect(screen.getByText('Date: Newest First')).toBeInTheDocument();
    expect(screen.getByText('Date: Oldest First')).toBeInTheDocument();
    expect(screen.getByText('Name: A → Z')).toBeInTheDocument();
    expect(screen.getByText('Name: Z → A')).toBeInTheDocument();
  });

  it('should call onSortChange when selecting an option', async () => {
    const user = userEvent.setup();
    const mockOnSort = vi.fn();
    render(<SortDropdown sortBy="date-newest" onSortChange={mockOnSort} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'date-oldest');
    
    expect(mockOnSort).toHaveBeenCalledWith('date-oldest');
  });

  it('should have proper accessibility label', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown sortBy="date-newest" onSortChange={mockOnSort} />);
    
    const select = screen.getByLabelText('Sort articles');
    expect(select).toBeInTheDocument();
  });

  it('should display sort icon', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown sortBy="date-newest" onSortChange={mockOnSort} />);
    
    const icon = screen.getByText('sort');
    expect(icon).toBeInTheDocument();
  });
});
