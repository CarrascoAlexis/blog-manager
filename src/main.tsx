// Core React import
import React from 'react';
// React 18's new root API for rendering
import { createRoot } from 'react-dom/client';
// Router provider for client-side routing
import { BrowserRouter } from 'react-router-dom';
// Main application component
import App from './App';
// Theme context provider for managing app themes
import { ThemeProvider } from './contexts/ThemeContext';
// Global theme CSS variables and styles
import './styles/themes.css';
// Accessibility utilities and styles
import './styles/accessibility.css';

// Create React root and render the application
// Non-null assertion (!) used because we know 'root' element exists in index.html
createRoot(document.getElementById('root')!).render(
    // StrictMode helps identify potential problems in the application
    <React.StrictMode>
        {/* ThemeProvider wraps the app to provide theme context */}
        <ThemeProvider>
            {/* BrowserRouter enables client-side routing */}
            <BrowserRouter>
                {/* Main application component */}
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
