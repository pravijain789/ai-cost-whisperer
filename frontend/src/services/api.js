import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const getCosts = () => axios.get(`${BASE_URL}/api/costs`).then(res => res.data);
export const getInsights = () => axios.get(`${BASE_URL}/api/insights`).then(res => res.data);
