import { axiosInstance } from '../helper/axios-config';

const getGender = () => {
    return axiosInstance.get('gender', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createGender = (data) => {
    return axiosInstance.get('gender', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateGender = (genderId, data) => {
    return axiosInstance.get(`gender/${genderId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getGender, createGender, updateGender
}