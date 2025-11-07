# Testing Documentation

This project uses [Vitest](https://vitest.dev/) for unit testing React components and custom hooks.

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once
npm run test:run

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are located alongside the code they test, following the pattern `*.test.ts` or `*.test.tsx`.

### Current Test Coverage

#### Hooks
- **useLocalStorage** (`src/hooks/useLocalStorage.test.ts`)
  - ✅ Returns initial value when localStorage is empty
  - ✅ Returns stored value from localStorage
  - ✅ Updates localStorage when setValue is called
  - ✅ Handles objects and arrays
  - ✅ Updates value correctly
  - ✅ Handles invalid JSON gracefully

#### Components
- **SearchBar** (`src/components/SearchBar/SearchBar.test.tsx`)
  - ✅ Renders with placeholder text
  - ✅ Displays the current search term
  - ✅ Calls onSearchChange when typing
  - ✅ Has proper accessibility attributes
  - ✅ Shows search icon

- **CategoryFilter** (`src/components/CategoryFilter/CategoryFilter.test.tsx`)
  - ✅ Renders all categories
  - ✅ Calls onCategoryChange when clicking a category
  - ✅ Applies active state to selected category
  - ✅ Has proper accessibility attributes
  - ✅ Has aria-label for each category button

- **SortDropdown** (`src/components/SortDropdown/SortDropdown.test.tsx`)
  - ✅ Renders with current sort option
  - ✅ Renders all sort options
  - ✅ Calls onSortChange when selecting an option
  - ✅ Has proper accessibility label
  - ✅ Displays sort icon

## Testing Tools

- **Vitest**: Fast unit test framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **jsdom**: DOM environment for tests

## Writing New Tests

### Example Component Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    render(<YourComponent onClick={mockHandler} />);
    
    await user.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

### Example Hook Test

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useYourHook from './useYourHook';

describe('useYourHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useYourHook('initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update value', () => {
    const { result } = renderHook(() => useYourHook('initial'));
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
  });
});
```

## Best Practices

1. **Test user behavior, not implementation details**
   - Use `screen.getByRole()` over `screen.getByTestId()`
   - Test what users see and interact with

2. **Keep tests focused and isolated**
   - One assertion per test when possible
   - Clear test descriptions

3. **Use proper accessibility queries**
   - Prefer `getByRole`, `getByLabelText`, `getByPlaceholderText`
   - Avoid `getByTestId` unless necessary

4. **Mock external dependencies**
   - Use `vi.fn()` for function mocks
   - Mock localStorage, API calls, etc.

5. **Clean up after tests**
   - The setup file automatically runs `cleanup()` after each test

## Continuous Integration

Tests should be run in CI/CD pipelines before deployment:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm run test:run
```

## Troubleshooting

### Tests are slow
- Use `test:run` instead of watch mode in CI
- Consider using `--no-coverage` flag during development

### Import errors
- Check that test files have proper imports
- Ensure vitest.config.ts has correct path aliases

### DOM not available
- Verify `environment: 'jsdom'` is set in vitest.config.ts
- Check setup file is imported correctly
