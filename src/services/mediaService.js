import { axiosInstance } from '../helper/axios-config';

const getMedia = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createMedia = (data) => {
    return axiosInstance.post('media', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getMedia, createMedia, updateMedia
}