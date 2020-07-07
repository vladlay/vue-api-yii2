import axios from 'axios';
import router from '../router';
import httpClient from './http.service';

const authService = {
    user: null,
    async login(formData) {
        try {
            const { status, data } = await httpClient.post('user/login', formData);
            if (status === 200) {
                this.setUser(data);
                return { success: true };
            }
        } catch (e) {
            return {
                success: false,
                errors: e.response.data.errors
            }
        }
    },
    async register(formData) {
        try {
            const { status, data } = await httpClient.post('user/signup', formData);
            if (status === 200) {
                this.setUser(data);
                return { success: true };
            }
        } catch (e) {
            return {
                success: false,
                errors: e.response.data.errors
            }
        }
    },
    async getCurrentUser() {
        if (!this.user) {
            const { status, data } = await httpClient.post('user/get-data');
            if (status === 200) {
                this.user = data;
            }
        }
        return this.user;
    },
    setUser(user) {
        this.user = user;
        localStorage.setItem('ACCESS_TOKEN', user.access_token);
    },
    isLoggedIn() {
        return !!localStorage.getItem('ACCESS_TOKEN');
    },
    getToken() {
        return localStorage.getItem('ACCESS_TOKEN');
    },
    logout() {
        localStorage.removeItem('ACCESS_TOKEN');
        router.push({ name: 'login' });
    }
};

export default authService;