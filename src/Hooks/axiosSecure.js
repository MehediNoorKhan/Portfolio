import axios from 'axios';
import auth from '../Firebase/firebase.init'; // Adjust path if needed
import { getIdToken } from 'firebase/auth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000', // 🔁 Replace with your actual backend URL
});

axiosSecure.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await getIdToken(user, true);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosSecure;
