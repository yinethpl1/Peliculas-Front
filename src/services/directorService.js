import { axiosInstance } from '../helper/axios-config';

const getDirector = () => {
    return axiosInstance.get('director', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createDirector = (data) => {
    return axiosInstance.post('director', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateDirector = (directorId, data) => {
    return axiosInstance.get(`director/${directorId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getDirector, createDirector, updateDirector
}