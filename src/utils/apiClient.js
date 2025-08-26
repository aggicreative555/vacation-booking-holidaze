const API_BASE = 'https://v2.api.noroff.dev';

export const apiClient = async (endpoint, options = {}, requireAuth = false) =>{
    const token = localStorage.getItem('accessToken');
    
    if (requireAuth && !token) {
        throw new Error('Authentication required but no token found.');
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (requireAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...options,
        method: options.method || 'GET',
        headers,
    }

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }


    const response = await fetch(`${API_BASE}${endpoint}`, config);

    const data = await response.json();

    if (!response.ok) {
        const error = new Error('API request failed. Try again');
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}