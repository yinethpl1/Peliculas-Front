import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL: 'http://localhost:4000/'
    baseURL: 'https://inventario-back-oxpr.onrender.com/'

});

export {
    axiosInstance
}