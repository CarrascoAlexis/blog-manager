import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders footer element', () => {
        render(<Footer />);
        
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('displays current year in copyright', () => {
        render(<Footer />);
        
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('displays copyright symbol and text', () => {
        render(<Footer />);
        
        expect(screen.getByText(/©/)).toBeInTheDocument();
        expect(screen.getByText(/Blog Manager/i)).toBeInTheDocument();
    });

    it('displays all rights reserved text', () => {
        render(<Footer />);
        
        expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });

    it('has proper accessibility role', () => {
        render(<Footer />);
        
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('footer');
    });
});
