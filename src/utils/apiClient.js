const API_BASE = 'https://v2.api.noroff.dev';

export const apiClient = async (
  endpoint,
  options = {},
  requireAuth = false,
  requireKey = false
) => {
  const token = localStorage.getItem('accessToken');
  const key = import.meta.env.VITE_API_KEY;

  if (requireAuth && !token) {
    throw new Error('Authentication required but no token found.');
  }

  if (requireKey && !key) {
    throw new Error('Api Key required but no key found.');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(requireAuth ? { Authorization: `Bearer ${token}` } : {}),
    ...(requireKey ? { 'X-Noroff-API-Key': key } : {}),
    ...(options.headers || {}),
  };

  const config = {
    method: options.method || 'GET',
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
    body: options.body,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  let data = null;
  try {
    const contentType = response.headers.get('content-type');
    if(contentType && contentType.includes('application/json')) {
      data = await response.json();
    }
  } catch (e) {
    console.warn('Failed to parse JSON', e)
    data = null;
  }
  
  if (!response.ok) {
    const error = new Error('API request failed. Try again');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};
