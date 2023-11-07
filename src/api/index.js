import axios from "axios"
const axiosInstance = axios.create({
  // baseURL: 'http://23.101.22.149:8074',
    baseURL: 'https://zmarkforce.com',
})
export default axiosInstance