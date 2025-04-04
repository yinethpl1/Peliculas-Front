import { axiosInstance } from '../helper/axios-config';

const getType = () => {
    return axiosInstance.get('type', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createType = (data) => {
    return axiosInstance.post('type', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateType = (typeId, data) => {
    return axiosInstance.put(`type/${typeId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getType, createType, updateType
}