import axios from 'axios';

const taskManagerApi = axios.create({
    baseURL:'http://localhost:8000/api'
})

taskManagerApi.interceptors.request.use( config => {
    
    config.headers = {
        ...config.headers,
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access-token')}`
    }

    return config;
} )

export default taskManagerApi;