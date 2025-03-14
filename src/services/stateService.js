import { axiosInstance } from '../helper/axios-config';

const getStates = () => {
    return axiosInstance.get('equipment-state', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createState = (data) => {
    return axiosInstance.get('equipment-state', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateState = (equipmentStateId, data) => {
    return axiosInstance.get(`equipment-state/${equipmentStateId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getStates, createState, updateState
}