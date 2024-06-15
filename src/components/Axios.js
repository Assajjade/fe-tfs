import axios from 'axios'

const baseUrl = "https://thefloatingschoolbe.vercel.app/"
const AxiosInstance = axios.create({
    baseURL: baseUrl, 
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
})

export default AxiosInstance