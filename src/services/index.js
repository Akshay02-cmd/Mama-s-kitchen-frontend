/**
 * Services Index
 * 
 * Central export point for all API services
 * 
 * Usage:
 * import { authService, profileService } from '@/services';
 * 
 * Or import individual services:
 * import authService from '@/services/auth.service';
 */

// API Configuration
export { default as apiClient } from './api/apiClient.js';
export * from './api/constants.js';
export * from './api/errorHandler.js';

// Services
export { default as authService } from './auth.service.js';
export { default as profileService } from './profile.service.js';
export { default as messService } from './mess.service.js';
export { default as mealService } from './meal.service.js';
export { default as orderService } from './order.service.js';
export { default as reviewService } from './review.service.js';
export { default as contactService } from './contact.service.js';
export { default as userService } from './user.service.js';

// Named exports for convenience
export * from './auth.service.js';
export * from './profile.service.js';
export * from './mess.service.js';
export * from './meal.service.js';
export * from './order.service.js';
export * from './review.service.js';
export * from './contact.service.js';
export * from './user.service.js';
