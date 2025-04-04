import { axiosInstance } from '../helper/axios-config';

const getStates = () => {
    return axiosInstance.get('equipment-state', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createState = (data) => {
    return axiosInstance.post('equipment-state', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateState = (equipmentStateId, data) => {
    return axiosInstance.put(`equipment-state/${equipmentStateId}`, data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getStates, createState, updateState
}