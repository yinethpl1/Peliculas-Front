import { axiosInstance } from '../helper/axios-config';

const getProducer = () => {
    return axiosInstance.get('producer', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createProducer = (data) => {
    return axiosInstance.post('producer', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateProducer = (producerId, data) => {
    return axiosInstance.get(`producer/${producerId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProducer, createProducer, updateProducer
}