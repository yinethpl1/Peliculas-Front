import { axiosInstance } from '../helper/axios-config';

const getBrands = () => {
    return axiosInstance.get('brand', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createBrand = (data) => {
    return axiosInstance.get('brand', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateBrand = (brandId, data) => {
    return axiosInstance.get(`brand/${brandId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getBrands, createBrand, updateBrand
}