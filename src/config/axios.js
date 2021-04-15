import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://eshop-deve.herokuapp.com/api/v2/'
});

export default clienteAxios;