/**
 * Test Data for Blog Manager
 * 
 * To populate localStorage with test articles and categories, run this in your browser console:
 * 
 * Copy and paste the code below into your browser's developer console:
 */

// BROWSER CONSOLE SCRIPT - Copy everything below this line


const testCategories = [
    { id: 'cat-dev', name: 'Development', description: 'Software development and programming', color: '#6366f1' },
    { id: 'cat-css', name: 'CSS', description: 'Cascading Style Sheets and styling', color: '#ec4899' },
    { id: 'cat-a11y', name: 'Accessibility', description: 'Web accessibility and inclusive design', color: '#10b981' },
    { id: 'cat-js', name: 'JavaScript', description: 'JavaScript programming language', color: '#f59e0b' },
    { id: 'cat-react', name: 'React', description: 'React library and ecosystem', color: '#06b6d4' },
    { id: 'cat-perf', name: 'Performance', description: 'Web performance optimization', color: '#8b5cf6' },
    { id: 'cat-backend', name: 'Backend', description: 'Server-side development', color: '#14b8a6' },
    { id: 'cat-webstd', name: 'Web Standards', description: 'Web platform standards and APIs', color: '#f97316' },
    { id: 'cat-git', name: 'Version Control', description: 'Git and version control systems', color: '#ef4444' },
    { id: 'cat-design', name: 'Design', description: 'Web and UI/UX design', color: '#a855f7' },
    { id: 'cat-api', name: 'API', description: 'API design and development', color: '#0ea5e9' },
    { id: 'cat-test', name: 'Testing', description: 'Software testing and quality assurance', color: '#84cc16' }
];

const testArticles = [
    {
        id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
        title: 'Getting Started with React and TypeScript',
        excerpt: 'Learn how to set up a modern React application with TypeScript, exploring best practices and common patterns.',
        author: 'Jane Doe',
        date: '2025-11-05',
        category: { id: 'cat-dev', name: 'Development', color: '#6366f1' },
        readTime: '5 min read',
        content: `
## Introduction

React and TypeScript are a powerful combination for building modern web applications. TypeScript adds static typing to JavaScript, helping catch errors early and improving code quality.

## Why Use TypeScript with React?

- Better IDE support with autocomplete and IntelliSense
- Catch errors at compile-time instead of runtime
- Improved code documentation through type definitions
- Enhanced refactoring capabilities

## Setting Up Your Project

The easiest way to start a React TypeScript project is using Vite:

\`\`\`
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Basic Type Definitions

Here's an example of a typed React component:

\`\`\`typescript
interface UserProps {
  name: string;
  age: number;
  isActive: boolean;
}

function User({ name, age, isActive }: UserProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
\`\`\`

> Pro tip: Always define interfaces for your component props. This makes your components self-documenting and easier to use.

## Common Patterns

### State Management

TypeScript works seamlessly with React hooks:

\`\`\`typescript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

### Event Handlers

Type your event handlers properly:

\`\`\`typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget.value);
};
\`\`\`

## Conclusion

Starting with React and TypeScript might seem daunting, but the benefits far outweigh the initial learning curve. Your future self will thank you for the type safety and better developer experience!
        `
    },
    {
        id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
        title: 'CSS Grid vs Flexbox: When to Use Which',
        excerpt: 'A comprehensive guide to understanding the differences between CSS Grid and Flexbox, and when to use each layout system.',
        author: 'John Smith',
        date: '2025-11-03',
        category: { id: 'cat-css', name: 'CSS', color: '#ec4899' },
        readTime: '8 min read',
        content: `
## The Great Layout Debate

CSS Grid and Flexbox are both powerful layout tools, but they serve different purposes. Understanding when to use each one will make you a more effective developer.

## Flexbox: The One-Dimensional Layout Tool

Flexbox is designed for **one-dimensional layouts** - either a row or a column. It excels at distributing space and aligning items within a container.

### When to Use Flexbox

- Navigation bars and menus
- Card layouts in a single row or column
- Centering items vertically and horizontally
- Distributing space between items dynamically

### Flexbox Example

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

---

## CSS Grid: The Two-Dimensional Layout Tool

CSS Grid is designed for **two-dimensional layouts** - rows and columns simultaneously. It's perfect for complex page layouts.

### When to Use Grid

- Overall page layout
- Image galleries with complex arrangements
- Dashboard layouts
- Any layout where you need control over rows AND columns

### Grid Example

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  grid-auto-rows: minmax(200px, auto);
}
\`\`\`

> **💡 Pro Tip:** You can combine Grid and Flexbox! Use Grid for the overall layout and Flexbox for components within grid items.

## Comparison Table

| Feature | Flexbox | CSS Grid |
|---------|---------|----------|
| Dimensions | One-dimensional | Two-dimensional |
| Best For | Components, small layouts | Page layouts, complex grids |
| Item Control | Content-based | Grid-based |
| Browser Support | Excellent | Excellent |

## Conclusion

Both Flexbox and Grid are essential tools in modern CSS. Don't think of them as competing technologies - they complement each other perfectly!

> "The best layout tool is the one that solves your specific problem most elegantly." - CSS Zen Master
        `
    },
    {
        id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
        title: 'Building Accessible Web Applications',
        excerpt: 'Discover essential techniques for creating inclusive web experiences that work for everyone.',
        author: 'Sarah Johnson',
        date: '2025-11-01',
        category: { id: 'cat-a11y', name: 'Accessibility', color: '#10b981' },
        readTime: '10 min read',
        content: `
## Why Accessibility Matters

Web accessibility ensures that all users, including those with disabilities, can access and use your web applications effectively. It's not just a nice-to-have—it's essential for creating inclusive digital experiences.

## Semantic HTML

Use semantic HTML elements to provide meaning and structure to your content:

\`\`\`html
<!-- Good -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<!-- Bad -->
<div class="header">
  <div class="nav">
    <div class="list">
      <div class="item"><a href="/">Home</a></div>
    </div>
  </div>
</div>
\`\`\`

## ARIA Labels and Roles

When semantic HTML isn't enough, use ARIA attributes:

\`\`\`html
<button aria-label="Close dialog" onclick="closeDialog()">
  <span aria-hidden="true">&times;</span>
</button>

<div role="alert" aria-live="polite">
  Form submitted successfully!
</div>
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

- Use proper focus management
- Provide visible focus indicators
- Support Tab, Enter, Space, and Arrow keys
- Don't trap keyboard focus

\`\`\`css
button:focus,
a:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}
\`\`\`

## Color Contrast

Maintain sufficient color contrast ratios:

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text:** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

## Alternative Text for Images

Always provide meaningful alt text:

\`\`\`html
<!-- Good -->
<img src="chart.png" alt="Sales increased by 25% in Q3 2024">

<!-- Bad -->
<img src="chart.png" alt="chart">
\`\`\`

## Testing Tools

- **WAVE:** Browser extension for accessibility evaluation
- **axe DevTools:** Automated accessibility testing
- **Screen readers:** NVDA, JAWS, VoiceOver
- **Keyboard only:** Navigate without a mouse

## Conclusion

Accessibility is an ongoing journey, not a destination. By incorporating these practices into your development workflow, you create better experiences for everyone.
        `
    },
    {
        id: 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a',
        title: 'Modern JavaScript Features You Should Know',
        excerpt: 'Explore the latest JavaScript features including optional chaining, nullish coalescing, and more.',
        author: 'Mike Wilson',
        date: '2025-10-28',
        category: { id: 'cat-js', name: 'JavaScript', color: '#f59e0b' },
        readTime: '7 min read',
        content: `
## JavaScript Evolution

JavaScript continues to evolve with powerful new features that make our code cleaner and more expressive. Let's explore some of the most useful modern additions.

## Optional Chaining (?.)

Access nested properties safely without verbose null checks:

\`\`\`javascript
// Old way
const city = user && user.address && user.address.city;

// Modern way
const city = user?.address?.city;
\`\`\`

> **ℹ️ Info:** Optional chaining returns \`undefined\` if any part of the chain is null or undefined.

## Nullish Coalescing (??)

Provide default values only for \`null\` or \`undefined\`:

\`\`\`javascript
// Using || (also catches 0, false, '')
const count = userCount || 10;  // Problem if userCount is 0!

// Using ?? (only catches null/undefined)
const count = userCount ?? 10;  // Correct!
\`\`\`

## Destructuring with Defaults

Extract values with fallback defaults in one line:

\`\`\`javascript
const { name = 'Anonymous', age = 0 } = user;
const [first, second = 'default'] = array;
\`\`\`

## Template Literals

Create multi-line strings and embed expressions easily:

\`\`\`javascript
const message = \`Hello \${name},
Welcome to our platform!
You have \${notifications.length} new notifications.\`;
\`\`\`

## Spread and Rest Operators

### Spread

\`\`\`javascript
const merged = { ...defaults, ...userOptions };
const combined = [...array1, ...array2];
\`\`\`

### Rest

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

const { first, ...rest } = object;
\`\`\`

> **⚠️ Warning:** Spread creates shallow copies. Nested objects are still referenced!

## Array Methods

Modern array methods make data manipulation elegant:

\`\`\`javascript
// Find
const user = users.find(u => u.id === 123);

// Filter
const active = users.filter(u => u.isActive);

// Map
const names = users.map(u => u.name);

// Some and Every
const hasAdmin = users.some(u => u.role === 'admin');
const allActive = users.every(u => u.isActive);
\`\`\`

## Async/Await

Handle asynchronous code with synchronous-looking syntax:

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
\`\`\`

## Conclusion

These modern JavaScript features help write more *readable*, *maintainable*, and *robust* code. Start incorporating them into your daily development!
        `
    },
    {
        id: 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b',
        title: 'State Management in React: A Complete Guide',
        excerpt: 'From useState to Redux, learn about different state management solutions and when to use them.',
        author: 'Emily Chen',
        date: '2025-10-25',
        category: { id: 'cat-react', name: 'React', color: '#06b6d4' },
        readTime: '12 min read',
        content: `
## The State Management Landscape

State management is crucial for building scalable React applications. Let's explore different solutions and when to use each one.

## Built-in React State

### useState

Perfect for local component state:

\`\`\`javascript
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

function increment() {
  setCount(prev => prev + 1);
}
\`\`\`

### useReducer

Great for complex state logic:

\`\`\`javascript
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

## Context API

Share state across component tree without prop drilling:

\`\`\`javascript
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme('dark')}>{theme}</button>;
}
\`\`\`

> **⚠️ Warning:** Context causes re-renders of all consumers when value changes. Split contexts when needed!

## When to Use External Libraries

Consider external state management when you need:

- Complex global state
- Persistent state (localStorage, IndexedDB)
- Time-travel debugging
- Optimized re-renders
- Middleware support

## Popular Solutions

### Zustand (Recommended for most apps)

\`\`\`javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
\`\`\`

### Redux Toolkit

\`\`\`javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});
\`\`\`

## Decision Tree

| Scenario | Solution |
|----------|----------|
| Local component state | useState |
| Complex local state | useReducer |
| Share state across few components | Props |
| Share state across many components | Context API |
| Complex global state | Zustand/Redux |
| Server state | React Query/SWR |

## Best Practices

- **Start simple:** Use local state first
- **Lift state up:** Move state to common ancestor when needed
- **Split contexts:** Don't put everything in one context
- **Memoize context values:** Prevent unnecessary re-renders
- **Consider server state separately:** Use React Query for API data

## Conclusion

The best state management solution depends on your specific needs. Start with built-in React features and reach for external libraries only when necessary!
        `
    },
    {
        id: 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c',
        title: 'Performance Optimization Tips for Web Apps',
        excerpt: 'Practical strategies to improve your web application performance and user experience.',
        author: 'David Brown',
        date: '2025-10-20',
        category: { id: 'cat-perf', name: 'Performance', color: '#8b5cf6' },
        readTime: '9 min read',
        content: `
## Why Performance Matters

Every 100ms delay in load time can decrease conversion rates by 7%. Performance isn't just about speed—it's about user experience and business success.

## Measure First

Use these tools to identify bottlenecks:

- **Chrome DevTools Performance Tab:** Record runtime performance
- **Lighthouse:** Automated performance audits
- **WebPageTest:** Real-world performance testing
- **Core Web Vitals:** LCP, FID, CLS metrics

## Code Splitting

Load only what you need, when you need it:

\`\`\`javascript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## Image Optimization

Images often account for most page weight:

- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Serve responsive images
- Compress images properly

\`\`\`html
<img 
  src="image.webp" 
  loading="lazy"
  srcset="image-320.webp 320w, image-640.webp 640w"
  sizes="(max-width: 640px) 100vw, 640px"
  alt="Description"
>
\`\`\`

## Memoization in React

Prevent unnecessary re-renders:

\`\`\`javascript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callback functions
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Memoize components
const MemoizedComponent = memo(ExpensiveComponent);
\`\`\`

> **💡 Pro Tip:** Don't memoize everything! Only optimize when you have measured performance issues.

## Debouncing and Throttling

Control how often functions execute:

\`\`\`javascript
// Debounce - wait for pause in events
const debouncedSearch = debounce((query) => {
  searchAPI(query);
}, 300);

// Throttle - limit execution rate
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);
\`\`\`

## Virtual Scrolling

Render only visible items in long lists:

\`\`\`javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}
\`\`\`

## Bundle Size Optimization

Keep your JavaScript bundle lean:

- Analyze bundle with webpack-bundle-analyzer
- Remove unused dependencies
- Use tree-shaking
- Consider lighter alternatives

\`\`\`bash
# Check package sizes before installing
npx bundlephobia moment
\`\`\`

## Caching Strategies

Leverage browser caching:

- Set appropriate Cache-Control headers
- Use service workers for offline support
- Implement stale-while-revalidate
- Cache API responses with React Query

## Performance Checklist

- ✅ Minimize main thread work
- ✅ Reduce JavaScript bundle size
- ✅ Optimize images and fonts
- ✅ Enable compression (gzip/brotli)
- ✅ Use CDN for static assets
- ✅ Implement code splitting
- ✅ Lazy load below-the-fold content
- ✅ Prefetch critical resources

## Conclusion

Performance optimization is an iterative process. Measure, optimize, and measure again. Focus on the metrics that matter most to your users!
        `
    },
    {
        id: 'a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d',
        title: 'Understanding REST APIs and Best Practices',
        excerpt: 'Deep dive into RESTful API design principles, HTTP methods, status codes, and security considerations.',
        author: 'Alex Turner',
        date: '2025-10-15',
        category: { id: 'cat-backend', name: 'Backend', color: '#14b8a6' },
        readTime: '11 min read',
        content: `
## What is REST?

REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods to perform operations on resources.

## Core Principles

### 1. Resource-Based URLs

URLs should represent resources, not actions:

\`\`\`
Good:
GET    /api/users          # Get all users
GET    /api/users/123      # Get user 123
POST   /api/users          # Create new user
PUT    /api/users/123      # Update user 123
DELETE /api/users/123      # Delete user 123

Bad:
GET    /api/getUsers
POST   /api/createUser
POST   /api/deleteUser/123
\`\`\`

### 2. HTTP Methods

Use the right method for the right operation:

| Method | Purpose | Idempotent | Safe |
|--------|---------|-----------|------|
| GET | Retrieve resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Update/Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |

### 3. Status Codes

Return meaningful HTTP status codes:

**Success (2xx)**
- 200 OK - Request succeeded
- 201 Created - Resource created
- 204 No Content - Success with no response body

**Client Errors (4xx)**
- 400 Bad Request - Invalid request data
- 401 Unauthorized - Authentication required
- 403 Forbidden - Authenticated but not authorized
- 404 Not Found - Resource doesn't exist
- 409 Conflict - Request conflicts with current state

**Server Errors (5xx)**
- 500 Internal Server Error - Something went wrong
- 503 Service Unavailable - Server temporarily down

## Request/Response Examples

### GET Request

\`\`\`javascript
// Request
GET /api/users/123

// Response - 200 OK
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:00:00Z"
}
\`\`\`

### POST Request

\`\`\`javascript
// Request
POST /api/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com"
}

// Response - 201 Created
{
  "id": 124,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "createdAt": "2024-01-16T14:30:00Z"
}
\`\`\`

### Error Response

\`\`\`javascript
// Response - 400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\`

## Versioning

Include API version to prevent breaking changes:

\`\`\`
# URL versioning
/api/v1/users
/api/v2/users

# Header versioning
Accept: application/vnd.myapi.v1+json
\`\`\`

## Pagination

Handle large datasets efficiently:

\`\`\`javascript
GET /api/users?page=2&limit=20

// Response
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
\`\`\`

## Filtering and Sorting

\`\`\`
# Filtering
GET /api/users?role=admin&status=active

# Sorting
GET /api/users?sort=createdAt&order=desc

# Multiple fields
GET /api/users?sort=lastName,firstName
\`\`\`

## Security Best Practices

### Authentication

\`\`\`javascript
// JWT in Authorization header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### Rate Limiting

\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
\`\`\`

### Input Validation

Always validate and sanitize user input:

\`\`\`javascript
const { body } = request;

// Validate required fields
if (!body.email || !body.password) {
  return res.status(400).json({
    error: 'Email and password are required'
  });
}

// Sanitize input
const sanitizedEmail = validator.normalizeEmail(body.email);
\`\`\`

## CORS

Configure CORS for cross-origin requests:

\`\`\`javascript
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
\`\`\`

## Best Practices Checklist

- ✅ Use nouns for resource names, not verbs
- ✅ Return appropriate HTTP status codes
- ✅ Version your API from the start
- ✅ Implement pagination for list endpoints
- ✅ Provide consistent error responses
- ✅ Document your API (OpenAPI/Swagger)
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Validate all input
- ✅ Use JSON for request/response bodies

## Conclusion

Well-designed REST APIs are intuitive, consistent, and easy to use. Follow these principles and your API consumers will thank you!
        `
    },
    {
        id: 'b8c9d0e1-f2a3-4b5c-5d6e-7f8a9b0c1d2e',
        title: 'Introduction to Web Components',
        excerpt: 'Explore the power of native web components and how they can be used to create reusable custom elements.',
        author: 'Maria Garcia',
        date: '2025-10-10',
        category: { id: 'cat-webstd', name: 'Web Standards', color: '#f97316' },
        readTime: '6 min read',
        content: `
## What Are Web Components?

Web Components are a set of web platform APIs that allow you to create reusable, encapsulated HTML elements. They work in any JavaScript framework—or with no framework at all!

## The Three Main Technologies

### 1. Custom Elements

Define your own HTML elements:

\`\`\`javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  }
  
  connectedCallback() {
    this.innerHTML = '<button>Click me!</button>';
  }
}

customElements.define('my-button', MyButton);
\`\`\`

Usage:

\`\`\`html
<my-button></my-button>
\`\`\`

### 2. Shadow DOM

Encapsulate styles and markup:

\`\`\`javascript
class MyCard extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Add styles (scoped to this component!)
    shadow.innerHTML = \`
      <style>
        .card {
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    \`;
  }
}

customElements.define('my-card', MyCard);
\`\`\`

### 3. HTML Templates

Define reusable markup:

\`\`\`html
<template id="user-card-template">
  <style>
    .user-card {
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }
  </style>
  <div class="user-card">
    <img class="avatar" />
    <div class="info">
      <h3 class="name"></h3>
      <p class="email"></p>
    </div>
  </div>
</template>
\`\`\`

\`\`\`javascript
class UserCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(content);
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector('.name').textContent = 
      this.getAttribute('name');
    this.shadowRoot.querySelector('.email').textContent = 
      this.getAttribute('email');
    this.shadowRoot.querySelector('.avatar').src = 
      this.getAttribute('avatar');
  }
}

customElements.define('user-card', UserCard);
\`\`\`

## Lifecycle Callbacks

\`\`\`javascript
class MyElement extends HTMLElement {
  // Called when element is created
  constructor() {
    super();
  }
  
  // Called when element is inserted into DOM
  connectedCallback() {
    console.log('Element added to page');
  }
  
  // Called when element is removed from DOM
  disconnectedCallback() {
    console.log('Element removed from page');
  }
  
  // Called when attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(\`Attribute \${name} changed\`);
  }
  
  // Specify which attributes to observe
  static get observedAttributes() {
    return ['name', 'email'];
  }
}
\`\`\`

## Slots for Content Projection

\`\`\`html
<!-- Component definition -->
<template id="alert-box">
  <div class="alert">
    <slot name="icon">⚠️</slot>
    <slot></slot>
  </div>
</template>

<!-- Usage -->
<alert-box>
  <span slot="icon">🔥</span>
  <p>This is important!</p>
</alert-box>
\`\`\`

## Advantages

- **Framework agnostic:** Works everywhere
- **Encapsulation:** Styles and scripts won't leak
- **Reusability:** Use across different projects
- **Native:** No build step required
- **Future-proof:** Web standard

## Disadvantages

- **Browser support:** Need polyfills for older browsers
- **Learning curve:** Different from React/Vue patterns
- **SSR complexity:** Server-side rendering is tricky
- **Limited tooling:** Fewer dev tools compared to frameworks

## Real-World Example: Tabs Component

\`\`\`javascript
class TabsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        .tabs { display: flex; border-bottom: 2px solid #ddd; }
        .tab { padding: 0.5rem 1rem; cursor: pointer; }
        .tab.active { border-bottom: 2px solid blue; }
        .panel { display: none; padding: 1rem; }
        .panel.active { display: block; }
      </style>
      <div class="tabs">
        <slot name="tab"></slot>
      </div>
      <div class="panels">
        <slot name="panel"></slot>
      </div>
    \`;
  }
  
  attachEventListeners() {
    const tabs = this.querySelectorAll('[slot="tab"]');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.selectTab(index));
    });
  }
  
  selectTab(index) {
    // Implementation details...
  }
}

customElements.define('tabs-component', TabsComponent);
\`\`\`

## Conclusion

Web Components provide a standards-based way to create reusable components. While frameworks like React and Vue are great, Web Components offer true interoperability and longevity!
        `
    },
    {
        id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
        title: 'Git Workflow and Branching Strategies',
        excerpt: 'Master Git workflows, learn about different branching strategies like Git Flow and trunk-based development.',
        author: 'Chris Anderson',
        date: '2025-10-05',
        category: { id: 'cat-git', name: 'Version Control', color: '#ef4444' },
        readTime: '9 min read',
        content: `
## Why Branching Strategies Matter

A good branching strategy helps teams collaborate efficiently, maintain code quality, and deploy with confidence.

## Common Branching Models

### 1. Git Flow

A robust workflow for projects with scheduled releases:

**Branches:**
- \`main\` - Production-ready code
- \`develop\` - Integration branch
- \`feature/*\` - New features
- \`release/*\` - Release preparation
- \`hotfix/*\` - Emergency fixes

**Workflow:**

\`\`\`bash
# Start a feature
git checkout develop
git checkout -b feature/user-authentication

# Work on feature
git add .
git commit -m "Add login form"

# Merge back to develop
git checkout develop
git merge feature/user-authentication

# Create release
git checkout -b release/1.0.0 develop
# Bug fixes, version bumps
git checkout main
git merge release/1.0.0
git tag -a v1.0.0

# Hotfix
git checkout -b hotfix/security-patch main
# Fix the issue
git checkout main
git merge hotfix/security-patch
git checkout develop
git merge hotfix/security-patch
\`\`\`

### 2. GitHub Flow

Simpler workflow for continuous deployment:

**Branches:**
- \`main\` - Always deployable
- \`feature/*\` - All changes

**Workflow:**

\`\`\`bash
# Create feature branch
git checkout -b feature/add-comments

# Make changes and commit
git add .
git commit -m "Add comment functionality"

# Push and create pull request
git push origin feature/add-comments

# After review, merge to main
# Deploy main automatically
\`\`\`

### 3. Trunk-Based Development

Minimal branching, frequent integration:

**Workflow:**

\`\`\`bash
# Create short-lived branch
git checkout -b user-profile

# Make small change
git add .
git commit -m "Update user profile UI"

# Push and merge quickly (same day)
git push origin user-profile
# Create PR, get quick review, merge
\`\`\`

> **💡 Pro Tip:** Keep branches short-lived (< 24 hours) to minimize merge conflicts!

## Branch Naming Conventions

Use consistent, descriptive names:

\`\`\`
feature/add-user-authentication
bugfix/fix-login-redirect
hotfix/patch-security-vulnerability
release/v1.2.0
docs/update-api-documentation
\`\`\`

## Commit Message Best Practices

Write clear, meaningful commits:

\`\`\`bash
# Good
git commit -m "Add user authentication with JWT"
git commit -m "Fix: Prevent null pointer in user service"
git commit -m "Refactor: Extract validation logic to helper"

# Bad
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "wip"
\`\`\`

**Conventional Commits:**

\`\`\`
feat: Add user profile page
fix: Resolve memory leak in image loader
docs: Update API documentation
style: Format code with prettier
refactor: Simplify authentication logic
test: Add unit tests for user service
chore: Update dependencies
\`\`\`

## Pull Request Workflow

\`\`\`bash
# 1. Update your branch
git checkout main
git pull origin main
git checkout feature/my-feature
git rebase main

# 2. Push to remote
git push origin feature/my-feature

# 3. Create PR on GitHub/GitLab
# 4. Request reviews
# 5. Address feedback
# 6. Merge when approved
\`\`\`

## Merge vs Rebase

**Merge:** Preserves history

\`\`\`bash
git checkout main
git merge feature/my-feature
# Creates merge commit
\`\`\`

**Rebase:** Linear history

\`\`\`bash
git checkout feature/my-feature
git rebase main
# Replays commits on top of main
\`\`\`

**Squash:** Clean up history

\`\`\`bash
git rebase -i HEAD~3
# Combine multiple commits into one
\`\`\`

## Handling Conflicts

\`\`\`bash
# When merge conflict occurs
git status  # See conflicted files

# Edit files to resolve conflicts
# Look for <<<<<<< ======= >>>>>>>

# Mark as resolved
git add conflicted-file.js
git commit

# Or abort
git merge --abort
git rebase --abort
\`\`\`

## Useful Git Commands

\`\`\`bash
# View branch history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Stash changes temporarily
git stash
git stash pop

# Cherry-pick specific commit
git cherry-pick abc123

# View changes
git diff
git diff main..feature/my-branch
\`\`\`

## Branch Protection Rules

Configure on GitHub/GitLab:

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require signed commits
- ✅ Restrict who can push to main

## Choosing the Right Strategy

| Project Type | Recommended Strategy |
|--------------|---------------------|
| Mobile app with releases | Git Flow |
| Web app with CI/CD | GitHub Flow |
| Large team, high velocity | Trunk-Based |
| Open source | GitHub Flow |
| Monolithic with versions | Git Flow |

## Conclusion

The best branching strategy depends on your team size, deployment frequency, and project requirements. Start simple and evolve as needed!
        `
    },
    {
        id: 'd0e1f2a3-b4c5-4d5e-7f8a-9b0c1d2e3f4a',
        title: 'Responsive Design Patterns for Modern Web',
        excerpt: 'Learn essential responsive design patterns and techniques to create websites that work on any device.',
        author: 'Lisa Wong',
        date: '2025-09-28',
        category: { id: 'cat-design', name: 'Design', color: '#a855f7' },
        readTime: '8 min read',
        content: `
## Mobile-First Approach

Start designing for mobile, then enhance for larger screens:

\`\`\`css
/* Mobile first (default) */
.container {
  padding: 1rem;
  font-size: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 18px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

## Fluid Typography

Scale text smoothly across screen sizes:

\`\`\`css
/* Using clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

/* Using calc() */
body {
  font-size: calc(16px + 0.5vw);
}
\`\`\`

## Flexible Grids

Use CSS Grid for responsive layouts:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

**auto-fit vs auto-fill:**
- \`auto-fit\`: Expands items to fill available space
- \`auto-fill\`: Creates as many columns as possible

## Container Queries

Style elements based on container size (new!):

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

@container (min-width: 600px) {
  .card {
    font-size: 1.2rem;
  }
}
\`\`\`

## Responsive Images

Serve appropriate images for each device:

\`\`\`html
<!-- srcset for different sizes -->
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive image"
>

<!-- picture for art direction -->
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg">
  <source media="(min-width: 768px)" srcset="tablet.jpg">
  <img src="mobile.jpg" alt="Adaptive image">
</picture>
\`\`\`

## Navigation Patterns

### Mobile Menu (Hamburger)

\`\`\`css
.nav-menu {
  display: none;
}

.hamburger {
  display: block;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }
  
  .hamburger {
    display: none;
  }
}
\`\`\`

### Priority+ Pattern

Show important items, hide overflow:

\`\`\`css
.nav {
  display: flex;
  overflow: hidden;
}

.nav-item {
  flex-shrink: 0;
}

.more-menu {
  margin-left: auto;
}
\`\`\`

## Card Layouts

Flexible card grids that adapt:

\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Maintain aspect ratio */
.card-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}
\`\`\`

## Breakpoint Strategy

Common breakpoints:

\`\`\`css
/* Mobile: 320px - 767px (default) */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1439px */
@media (min-width: 1024px) { }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { }
\`\`\`

> **💡 Pro Tip:** Let your content determine breakpoints, not specific devices!

## Viewport Meta Tag

Essential for responsive design:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

## Touch-Friendly Design

Make interactive elements large enough:

\`\`\`css
button, a {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Add spacing between touch targets */
.button-group button {
  margin: 8px;
}
\`\`\`

## Performance Considerations

\`\`\`css
/* Use transform for animations (GPU accelerated) */
.element {
  transition: transform 0.3s;
}

.element:hover {
  transform: scale(1.05);
}

/* Avoid animating expensive properties */
/* ❌ Bad */
.bad {
  transition: width 0.3s;
}

/* ✅ Good */
.good {
  transition: transform 0.3s;
}
\`\`\`

## Testing Responsiveness

Tools and techniques:

- **Browser DevTools:** Test different viewports
- **Real devices:** Nothing beats the real thing
- **BrowserStack:** Test on multiple browsers/devices
- **Responsive images:** Verify correct images load

## Accessibility in Responsive Design

\`\`\`css
/* Ensure text remains readable */
body {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
}

/* Maintain color contrast */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
\`\`\`

## Conclusion

Responsive design is about creating flexible, adaptable experiences. Use modern CSS features, test on real devices, and always prioritize user experience across all screen sizes!
        `
    },
    {
        id: 'e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b',
        title: 'Introduction to GraphQL',
        excerpt: 'Understand GraphQL basics, queries, mutations, and how it compares to traditional REST APIs.',
        author: 'Tom Harris',
        date: '2025-09-20',
        category: { id: 'cat-api', name: 'API', color: '#0ea5e9' },
        readTime: '10 min read',
        content: `
## What is GraphQL?

GraphQL is a query language for APIs that allows clients to request exactly the data they need. Developed by Facebook in 2012, it provides a more efficient alternative to REST.

## Core Concepts

### Schema

Define your API structure with a strongly-typed schema:

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}
\`\`\`

### Queries

Request exactly what you need:

\`\`\`graphql
# Simple query
query {
  user(id: "123") {
    name
    email
  }
}

# Response
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
\`\`\`

**Nested queries:**

\`\`\`graphql
query {
  user(id: "123") {
    name
    posts {
      title
      createdAt
    }
  }
}
\`\`\`

### Mutations

Modify data on the server:

\`\`\`graphql
mutation {
  createPost(
    title: "GraphQL is awesome"
    content: "Let me tell you why..."
    authorId: "123"
  ) {
    id
    title
    author {
      name
    }
  }
}
\`\`\`

### Variables

Make queries reusable:

\`\`\`graphql
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}

# Variables (separate JSON)
{
  "userId": "123"
}
\`\`\`

## GraphQL vs REST

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Multiple | Single |
| Data fetching | Over/under fetching | Precise |
| Versioning | /v1/, /v2/ | Schema evolution |
| Documentation | Separate | Self-documenting |
| Caching | HTTP caching | Manual/Apollo |

## Advantages

### No Over-fetching

REST example:

\`\`\`javascript
// GET /api/users/123
// Returns: { id, name, email, avatar, bio, posts, followers, ... }
// But you only need name!
\`\`\`

GraphQL solution:

\`\`\`graphql
query {
  user(id: "123") {
    name  # Only what you need!
  }
}
\`\`\`

### No Under-fetching

REST example:

\`\`\`javascript
// Need user and their posts
GET /api/users/123
GET /api/posts?userId=123
// Two requests!
\`\`\`

GraphQL solution:

\`\`\`graphql
query {
  user(id: "123") {
    name
    posts {
      title
    }
  }
}
# One request!
\`\`\`

## Setting Up GraphQL Server

Using Apollo Server:

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

// Schema
const typeDefs = gql\`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    books: () => [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
      },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});
\`\`\`

## Client-Side Usage

Using Apollo Client:

\`\`\`javascript
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Pagination

\`\`\`graphql
type Query {
  posts(
    first: Int
    after: String
  ): PostConnection!
}

type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}

type PostEdge {
  node: Post!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
\`\`\`

## Subscriptions

Real-time updates:

\`\`\`graphql
type Subscription {
  messageAdded(channelId: ID!): Message
}

# Client usage
subscription {
  messageAdded(channelId: "123") {
    id
    content
    author {
      name
    }
  }
}
\`\`\`

## Error Handling

\`\`\`graphql
# Errors are returned in response
{
  "data": null,
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"]
    }
  ]
}
\`\`\`

## Best Practices

- **Name queries:** Makes debugging easier
- **Use fragments:** Reuse field selections
- **Implement DataLoader:** Batch and cache database requests
- **Add authentication:** Secure your resolvers
- **Paginate lists:** Prevent huge responses
- **Version schema carefully:** Use deprecation

## Common Pitfalls

- **N+1 queries:** Use DataLoader
- **Large responses:** Implement pagination
- **Complexity attacks:** Limit query depth
- **No HTTP caching:** Implement persisted queries

## Conclusion

GraphQL provides a powerful, flexible way to build APIs. While it has a learning curve, the benefits of precise data fetching and strong typing make it worth considering for your next project!
        `
    },
    {
        id: 'f2a3b4c5-d6e7-4f5a-9b0c-1d2e3f4a5b6c',
        title: 'Testing React Applications with Jest and React Testing Library',
        excerpt: 'A comprehensive guide to writing effective tests for React applications using modern testing tools.',
        author: 'Nina Patel',
        date: '2025-09-15',
        category: { id: 'cat-test', name: 'Testing', color: '#84cc16' },
        readTime: '13 min read',
        content: `
## Why Test Your React Apps?

Testing ensures your application works as expected, catches bugs early, and gives you confidence when refactoring. Well-tested code is easier to maintain and ship with confidence.

## Testing Philosophy

React Testing Library encourages testing from the user's perspective:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

## Setup

Install dependencies:

\`\`\`bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
\`\`\`

Configure Jest (jest.config.js):

\`\`\`javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
\`\`\`

## Basic Component Test

\`\`\`javascript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});
\`\`\`

## Querying Elements

### Recommended Queries (in order of preference)

\`\`\`javascript
// 1. getByRole (Most accessible)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('heading', { name: /title/i });

// 2. getByLabelText (Forms)
screen.getByLabelText(/username/i);

// 3. getByPlaceholderText
screen.getByPlaceholderText(/enter email/i);

// 4. getByText
screen.getByText(/hello world/i);

// 5. getByTestId (Last resort)
screen.getByTestId('custom-element');
\`\`\`

### Query Variants

\`\`\`javascript
// getBy - Throws error if not found
screen.getByRole('button');

// queryBy - Returns null if not found
screen.queryByRole('button');

// findBy - Async, waits for element
await screen.findByRole('button');

// getAllBy - Returns array
screen.getAllByRole('listitem');
\`\`\`

## Testing User Interactions

\`\`\`javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submits form with user credentials', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  
  render(<LoginForm onSubmit={handleSubmit} />);
  
  // Type into inputs
  await user.type(
    screen.getByLabelText(/username/i),
    'johndoe'
  );
  
  await user.type(
    screen.getByLabelText(/password/i),
    'secret123'
  );
  
  // Click submit button
  await user.click(
    screen.getByRole('button', { name: /submit/i })
  );
  
  // Assert function was called
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'johndoe',
    password: 'secret123',
  });
});
\`\`\`

## Testing Async Behavior

\`\`\`javascript
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

test('displays user data after loading', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'John Doe' }),
    })
  );
  
  render(<UserProfile userId="123" />);
  
  // Loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });
  
  // Or use findBy
  const name = await screen.findByText(/john doe/i);
  expect(name).toBeInTheDocument();
});
\`\`\`

## Mocking

### Mock Functions

\`\`\`javascript
const mockFn = jest.fn();

// Call it
mockFn('hello', 123);

// Assert
expect(mockFn).toHaveBeenCalledWith('hello', 123);
expect(mockFn).toHaveBeenCalledTimes(1);
\`\`\`

### Mock Modules

\`\`\`javascript
// __mocks__/axios.js
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

// In test
import axios from 'axios';

test('fetches data', async () => {
  axios.get.mockResolvedValue({ data: { name: 'John' } });
  
  // Test code that uses axios...
});
\`\`\`

## Testing Hooks

\`\`\`javascript
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
\`\`\`

## Testing with Context

\`\`\`javascript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import Button from './Button';

test('renders with theme', () => {
  render(
    <ThemeProvider theme="dark">
      <Button>Click me</Button>
    </ThemeProvider>
  );
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('dark-theme');
});

// Or create a custom render
function renderWithTheme(ui, { theme = 'light', ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });
}
\`\`\`

## Snapshot Testing

\`\`\`javascript
import { render } from '@testing-library/react';
import Card from './Card';

test('matches snapshot', () => {
  const { container } = render(
    <Card title="Hello" content="World" />
  );
  
  expect(container.firstChild).toMatchSnapshot();
});
\`\`\`

> **⚠️ Warning:** Use snapshots sparingly. They're brittle and hard to review!

## Common Assertions

\`\`\`javascript
// Presence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();

// Text content
expect(element).toHaveTextContent(/hello/i);

// Attributes
expect(element).toHaveAttribute('href', '/home');
expect(element).toHaveClass('active');

// Form elements
expect(input).toHaveValue('test');
expect(checkbox).toBeChecked();
expect(button).toBeDisabled();

// ARIA
expect(element).toHaveAccessibleName('Submit');
expect(element).toHaveAccessibleDescription('Click to submit');
\`\`\`

## Best Practices

**Do:**
- ✅ Test user behavior, not implementation
- ✅ Use accessible queries (getByRole)
- ✅ Test edge cases and error states
- ✅ Keep tests simple and focused
- ✅ Use userEvent over fireEvent

**Don't:**
- ❌ Test internal state or implementation details
- ❌ Rely on getByTestId as primary query
- ❌ Test third-party libraries
- ❌ Make tests dependent on each other
- ❌ Assert on CSS classes for logic

## Test Structure (AAA Pattern)

\`\`\`javascript
test('description of what it does', () => {
  // Arrange - Set up test data and conditions
  render(<Component />);
  
  // Act - Perform actions
  userEvent.click(screen.getByRole('button'));
  
  // Assert - Verify results
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
\`\`\`

## Coverage

Run tests with coverage:

\`\`\`bash
npm test -- --coverage
\`\`\`

Aim for:
- **Statements:** 80%+
- **Branches:** 80%+
- **Functions:** 80%+
- **Lines:** 80%+

> 100% coverage doesn't mean bug-free code. Focus on meaningful tests!

## Debugging Tests

\`\`\`javascript
import { render, screen } from '@testing-library/react';

test('debug example', () => {
  render(<Component />);
  
  // Print DOM
  screen.debug();
  
  // Print specific element
  screen.debug(screen.getByRole('button'));
});
\`\`\`

## Conclusion

Testing gives you confidence to ship features and refactor code. Start with the most critical user flows, and gradually increase coverage. Remember: write tests that give you confidence, not just coverage!
        `
    }
];

// Save to localStorage
localStorage.removeItem('blog-articles');
localStorage.setItem('blog-categories', JSON.stringify(testCategories));
localStorage.setItem('blog-articles', JSON.stringify(testArticles));
console.log('✅ Successfully added 12 categories and 12 test articles to localStorage!');
console.log('Refresh the page to see the articles.');


// To clear articles from localStorage, run this:
// localStorage.removeItem('blog-articles');
