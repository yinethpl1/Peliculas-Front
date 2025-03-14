import { axiosInstance } from '../helper/axios-config';

const getTypes = () => {
    return axiosInstance.get('equipment-type', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createType = (data) => {
    return axiosInstance.get('equipment-type', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateType = (equipmentTypeId, data) => {
    return axiosInstance.get(`equipment-type/${equipmentTypeId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getTypes, createType, updateType
}