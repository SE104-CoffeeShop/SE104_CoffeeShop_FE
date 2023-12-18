import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
    baseURL: api,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    // Handle success
    (response) => {
        return response;
    },
    // Handle error
    // eslint-disable-next-line consistent-return
    (error) => {
        const { response } = error;
        // Check if get 429 error code then wait response header Retry-After time and retry request
        if (response.status === 429) {
            const retryAfter = response.headers['retry-after'] || 1;
            return new Promise((resolve) => {
                setTimeout(() => resolve(axiosClient(error.config)), retryAfter * 1000);
            });
        }
        if (response.status === 401) {
            // If get 401 error code,remove access token and redirect to login page
            localStorage.removeItem('ACCESS_TOKEN');
            // Reload to perform authentication check again and redirect to login page
            window.location.href = '/login';
        } else if (response.status === 404) {
            // If get 404 error code, redirect to 404 page
            window.location.href = '/404';
        } else throw error;
    },
);

export default axiosClient;
