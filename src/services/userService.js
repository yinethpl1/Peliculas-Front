import { axiosInstance } from '../helper/axios-config';

const getUsers = () => {
    return axiosInstance.get('user', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createUser = (data) => {
    return axiosInstance.get('user', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateUser = (userId, data) => {
    return axiosInstance.get(`user/${userId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getUsers, createUser, updateUser
}