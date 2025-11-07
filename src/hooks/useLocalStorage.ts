import { useState } from 'react';

/**
 * Custom hook for persisting state in localStorage
 * Provides a state variable that automatically syncs with localStorage
 * 
 * @template T - The type of data to store
 * @param {string} key - The localStorage key to use
 * @param {T} initialValue - Default value if no stored value exists
 * @returns {[T, (value: T) => void]} - Array with [storedValue, setValue] similar to useState
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Initialize state from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Attempt to retrieve item from localStorage
            const item = window.localStorage.getItem(key);
            // Parse stored JSON or return initialValue if nothing found
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error reading localStorage, log error and return initialValue
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    
    /**
     * Setter function that updates both state and localStorage
     * @param {T} value - New value to store (can be a function for functional updates)
     */
    const setValue = (value: T) => {
        try {
            // Allow value to be a function (like useState)
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Update React state
            setStoredValue(valueToStore);
            // Persist to localStorage as JSON
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // If error writing to localStorage, log error
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
