import axios from 'axios';

export const getCosts = () => axios.get('/api/costs').then(res => res.data);
export const getInsights = () => axios.get('/api/insights').then(res => res.data);
