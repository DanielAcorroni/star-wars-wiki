import axios from "axios";

const baseUrlLogin = 'https://swapi.dev/api/';

export const disponibleApis = () => axios.get(baseUrlLogin);

export const getAll = (type) => axios.get(`${baseUrlLogin}${type}/`);

export const getBySpecificUrl = (url) => axios.get(url);