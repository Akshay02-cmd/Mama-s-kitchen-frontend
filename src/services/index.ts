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
export { default as apiClient } from './api/apiClient.ts';
export * from './api/constants.ts';
export * from './api/errorHandler.ts';

// Services
export { default as authService } from './auth.service.ts';
export { default as profileService } from './profile.service.ts';
export { default as messService } from './mess.service.ts';
export { default as mealService } from './meal.service.ts';
export { default as orderService } from './order.service.ts';
export { default as reviewService } from './review.service.ts';
export { default as contactService } from './contact.service.ts';
export { default as userService } from './user.service.ts';
export { default as ownerService } from './owner.service.ts';
export { default as uploadService } from './upload.service.ts';

// Named exports for convenience
export * from './auth.service.ts';
export * from './profile.service.ts';
export * from './mess.service.ts';
export * from './meal.service.ts';
export * from './order.service.ts';
export * from './review.service.ts';
export * from './contact.service.ts';
export * from './user.service.ts';
export * from './owner.service.ts';
export * from './upload.service.ts';
