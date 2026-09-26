import apiClient from './api/apiClient.ts';
import { API_ENDPOINTS } from './api/constants.ts';

export const uploadImage = async (file, folder = 'mummas-kitchen') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  const response = await apiClient.post(API_ENDPOINTS.UPLOADS.IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const uploadService = {
  uploadImage,
};

export default uploadService;
