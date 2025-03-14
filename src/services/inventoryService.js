import { axiosInstance } from '../helper/axios-config';

const getInventories = () => {
    return axiosInstance.get('inventory', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createInventory = (data) => {
    return axiosInstance.get('inventory', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateInventory = (inventoryId, data) => {
    return axiosInstance.get(`inventory/${inventoryId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getInventories, createInventory, updateInventory
}