/**
 * Hooks Index
 * Central export for all custom hooks
 * 
 * Usage:
 * import { useAuth, useMeals, useCart } from '@/hooks';
 * 
 * Or import by category:
 * import { useAuth } from '@/hooks/shared';
 * import { useMeals } from '@/hooks/customer';
 */

// Shared Hooks - Common across all roles
export * from './shared';

// Customer Hooks - Customer-specific functionality
export * from './customer';

// Owner Hooks - Owner-specific functionality
export * from './owner';

// Mess Hooks - Mess-specific functionality
export * from './mess';
