import { configAuth } from './authHeader';
import axios from 'axios';

const getUser = async () => {
    try {
        const res = await axios.get('http://localhost:5050/api/auth/check', {
            timeout: 2000,
            headers: configAuth()
        });

        if (res.data.token === null) {
            return [];
        } else {
            return [{ user: res.data.token }];
        }
    } catch (error) {
        if (error.response === 401) {
            localStorage.removeItem('token');
            return [];
        }
    }
}

export { getUser };