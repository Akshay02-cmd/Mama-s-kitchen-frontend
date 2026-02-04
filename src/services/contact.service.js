import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Contact Service
 * 
 * Handles all contact us-related API calls
 */

/**
 * Create a new contact us entry (Customer only)
 * @param {Object} contactData - Contact data
 * @param {string} contactData.subject - Subject of the contact
 * @param {string} contactData.message - Contact message
 * @returns {Promise<Object>} Created contact entry
 */
export const createContact = async (contactData) => {
  const response = await apiClient.post(API_ENDPOINTS.CONTACT.BASE, contactData);
  return response.data;
};

/**
 * Get all contact entries (Admin only)
 * @returns {Promise<Object>} List of all contact entries
 */
export const getAllContacts = async () => {
  const response = await apiClient.get(API_ENDPOINTS.CONTACT.BASE);
  return response.data;
};

/**
 * Get a single contact entry by ID (Admin only)
 * @param {string} contactId - Contact ID
 * @returns {Promise<Object>} Contact entry data
 */
export const getContactById = async (contactId) => {
  const response = await apiClient.get(API_ENDPOINTS.CONTACT.BY_ID(contactId));
  return response.data;
};

/**
 * Get contacts grouped by user (Admin only)
 * @returns {Promise<Object>} Contacts grouped by user
 */
export const getContactsGroupedByUser = async () => {
  const response = await apiClient.get(API_ENDPOINTS.CONTACT.GROUP_BY_USER);
  return response.data;
};

/**
 * Delete a contact entry (Admin only)
 * @param {string} contactId - Contact ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteContact = async (contactId) => {
  const response = await apiClient.delete(API_ENDPOINTS.CONTACT.BY_ID(contactId));
  return response.data;
};

/**
 * Delete all contact entries (Admin only)
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteAllContacts = async () => {
  const response = await apiClient.delete(API_ENDPOINTS.CONTACT.BASE);
  return response.data;
};

const contactService = {
  createContact,
  getAllContacts,
  getContactById,
  getContactsGroupedByUser,
  deleteContact,
  deleteAllContacts,
};

export default contactService;
