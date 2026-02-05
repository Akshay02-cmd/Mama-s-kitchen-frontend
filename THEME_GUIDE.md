# Theme System Guide

## Overview
This application now has a complete light/dark mode theme system with a modern purple/blue color scheme.

## Using the Theme

### 1. Import the hook
```jsx
import { useTheme } from '../hooks/useTheme';
```

### 2. Use in your component
```jsx
const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme === 'dark' ? 'var(--bg-primary)' : 'var(--bg-secondary)',
      color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-secondary)'
    }}>
      {/* Your content */}
    </div>
  );
};
```

## Color Scheme

### Light Mode
- **Primary**: Purple gradient (#8B5CF6 - Vibrant Purple)
- **Secondary**: Blue (#3B82F6)
- **Accent**: Teal (#14B8A6)
- **Background**: White/Light Gray
- **Text**: Dark Gray/Black

### Dark Mode  
- **Primary**: Lighter Purple (#A78BFA)
- **Secondary**: Light Blue (#60A5FA)
- **Accent**: Light Teal (#5EEAD4)
- **Background**: Dark Slate (#0F172A, #1E293B)
- **Text**: Light Gray/White

## CSS Variables Reference

### Backgrounds
- `--bg-primary` - Main background
- `--bg-secondary` - Secondary background
- `--bg-tertiary` - Tertiary background
- `--surface` - Card/surface background
- `--surface-elevated` - Elevated surface

### Text
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text
- `--text-tertiary` - Tertiary text
- `--text-muted` - Muted/disabled text

### Colors
- `--primary-[50-900]` - Primary color scale
- `--secondary-[50-800]` - Secondary color scale
- `--accent-[400-600]` - Accent colors

### Borders
- `--border-light` - Light borders
- `--border-medium` - Medium borders
- `--border-dark` - Dark borders

### Semantic
- `--success` - Success state
- `--warning` - Warning state
- `--error` - Error state
- `--info` - Info state

## Example Components

### Card Component
```jsx
const Card = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="p-6 rounded-lg shadow-lg"
      style={{
        backgroundColor: theme === 'dark' ? 'var(--surface)' : 'var(--bg-primary)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-light)'
      }}
    >
      {children}
    </div>
  );
};
```

### Button Component
```jsx
const Button = ({ children, variant = 'primary' }) => {
  const { theme } = useTheme();
  
  return (
    <button
      className="px-6 py-3 rounded-lg font-semibold transition-all"
      style={{
        background: variant === 'primary'
          ? theme === 'dark' 
            ? 'linear-gradient(to right, #7C3AED, #6D28D9)' 
            : 'linear-gradient(to right, #8B5CF6, #7C3AED)'
          : 'transparent',
        color: theme === 'dark' ? '#FFFFFF' : '#FFFFFF',
        border: variant === 'outline' ? `1px solid var(--border-medium)` : 'none'
      }}
    >
      {children}
    </button>
  );
};
```

## Theme Toggle
The theme toggle is already implemented in the Header component. Users can switch between light and dark modes using:
- Desktop: Sun/Moon icon button in the header
- Mobile: "Switch to Light/Dark Mode" button in the mobile menu

## Persistence
The theme preference is automatically saved to localStorage and persists across sessions.

## Tips
1. Always use CSS variables for colors instead of hardcoded values
2. Test your components in both light and dark modes
3. Use the `useTheme` hook to get the current theme
4. Add smooth transitions for better UX (already configured in index.css)
5. Consider accessibility - ensure sufficient contrast in both modes
