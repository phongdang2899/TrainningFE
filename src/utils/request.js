import axios from 'axios';

const BASE_URL = "http://localhost:8383/api/v1"

const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        Campaign: `0f5be425-79f7-513d-ab58-16ccf347424c`,
        'Content-Type': 'multipart/form-data',
    }
})

request.interceptors.response.use((response) => response, (error) => {
    return error.response ? Promise.reject(error.response.data) : Promise.reject(error)
})

export default request; 