# Blog Manager

A modern and elegant blog article management tool built with React and TypeScript.

---

## Project Description

**Blog Manager** is a comprehensive web application designed to help you create, organize, and manage blog articles with ease. It provides a smooth and intuitive user experience with a rich set of features.

### Key Features

- **Markdown Editor**: Write your articles using Markdown with an intuitive formatting toolbar featuring 12+ formatting options (headings, bold, italic, code blocks, lists, quotes, tables, links, and images)
- **Category Management**: Organize your articles with customizable colored categories
- **Advanced Filtering**: Search articles by title or content, filter by category, and sort by name or date
- **Local Storage**: All data is stored locally in your browser using localStorage, ensuring complete privacy and offline functionality
- **Customizable Themes**: Choose from 10+ different themes including light/dark modes, seasonal themes (Halloween, Christmas), and specialized modes (France, Solarized, High-Contrast, Sepia, Night Mode)
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for articles
- **Responsive Design**: Optimized interface for all devices (desktop, tablet, and mobile)
- **UUID-based Identification**: Each article has a unique identifier for reliable routing and management

The application stores articles with rich metadata including title, excerpt, author, category, read time, creation date, and full Markdown content. All data persists in your browser without requiring any backend server.

---

## Technologies

This project is built with modern web technologies:

### Core Framework

- **[React 18](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript for improved code quality
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool for fast development

### Routing and State

- **[React Router v6](https://reactrouter.com/)** - Declarative routing for React applications
- **Custom Hooks** - useLocalStorage hook for persistent state management
- **[Context API](https://react.dev/reference/react/createContext)** - Theme management and global state

### Styling

- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Custom CSS with CSS Variables for theming
- **[Google Fonts](https://fonts.google.com/)** - Inter font family for modern typography
- **[Material Symbols](https://fonts.google.com/icons)** - Google Material Design icons

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and quality checks
- **[TypeScript Compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html)** - Type checking and compilation
- **Vite HMR** - Hot Module Replacement for instant feedback

### Key Features Implementation

- **Markdown Parsing** - Custom Markdown to HTML converter
- **[UUID Generation](https://datatracker.ietf.org/doc/html/rfc4122)** - RFC4122 compliant unique identifiers
- **[LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Browser-native persistent storage
- **Responsive Design** - Mobile-first CSS with media queries

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **[Node.js](https://nodejs.org/)** (version 18.x or higher)
- **[npm](https://www.npmjs.com/)** (version 9.x or higher) or **[yarn](https://yarnpkg.com/)** (version 1.22.x or higher)

### Steps

1. Clone the repository

\\\bash
git clone https://github.com/CarrascoAlexis/blog-manager.git
\\\

2. Navigate to the project directory

\\\bash
cd blog-manager
\\\

3. Install dependencies

\\\bash
npm install
\\\

Or if you prefer yarn:

\\\bash
yarn install
\\\

---

## Run the Project

### Development Mode

To run the project in development mode with hot module replacement:

\\\bash
npm run dev
\\\

Or with yarn:

\\\bash
yarn dev
\\\

The application will start on http://localhost:5173 (default Vite port). Open your browser and navigate to this URL to view the application.

### Build for Production

To create an optimized production build:

\\\bash
npm run build
\\\

Or with yarn:

\\\bash
yarn build
\\\

The built files will be generated in the dist directory.

### Preview Production Build

To preview the production build locally:

\\\bash
npm run preview
\\\

Or with yarn:

\\\bash
yarn preview
\\\

### Linting

To run ESLint and check for code quality issues:

\\\bash
npm run lint
\\\

---

## Author

**Alexis Carrasco**

- GitHub: [@CarrascoAlexis](https://github.com/CarrascoAlexis)
- Project Repository: [blog-manager](https://github.com/CarrascoAlexis/blog-manager)

---

## Additional Information

### Project Structure

The project follows a modular architecture with clear separation of concerns:

- src/components/ - Reusable React components (ArticleCard, ArticleForm, SearchBar, etc.)
- src/pages/ - Page-level components (Home, Articles, Article, NewArticle)
- src/contexts/ - React Context providers for global state
- src/hooks/ - Custom React hooks (useLocalStorage)
- src/shared/ - Shared utilities, types, and interfaces
- src/styles/ - Global styles and theme definitions

### Features Overview

**Article Management**

- Create new articles with rich Markdown content
- Edit existing articles with inline editing
- Delete articles with confirmation modal
- View articles with formatted content rendering

**Search and Filter**

- Real-time search across titles and excerpts
- Filter by category
- Sort by name (A-Z, Z-A) or date (newest/oldest)
- Combined filtering for precise results

**Theme System**

- 10+ built-in themes
- Seasonal decorations (animated pumpkins, snowflakes)
- Theme persistence across sessions
- Smooth theme transitions

**Data Persistence**

- All articles saved in localStorage
- Custom categories with colors
- Theme preferences
- No server required

### License

This project is created as part of an educational assignment.

### Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Icons from [Material Symbols](https://fonts.google.com/icons)
- Fonts from [Google Fonts](https://fonts.google.com/)
