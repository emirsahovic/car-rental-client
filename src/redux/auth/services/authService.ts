import apiService from '../../services/apiService';
import { FormLoginValues } from '../../../pages/Login';
import { FormRegisterValues } from '../../../pages/Register';

const loginUser = async (userData: FormLoginValues) => {
    const { data } = await apiService.post('/auth/login', userData, { withCredentials: true });

    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
}

const registerUser = async (userData: FormRegisterValues) => {
    await apiService.post('/auth/register', userData, { withCredentials: true });
}

const logout = async () => {
    localStorage.removeItem('user');
    await apiService.get('/auth/logout');
}

const getUsers = async () => {
    const { data } = await apiService.get('/auth/users');
    return data;
}

const deleteUser = async (userId: string) => {
    const { data } = await apiService.delete(`/auth/users/${userId}`);
    return data;
}

const authService = {
    loginUser,
    registerUser,
    logout,
    getUsers,
    deleteUser
}

export default authService;
