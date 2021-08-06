import axios from 'axios'

// your ip privada
const baseURL = 'http://192.168.110.70:8080/api'

const cafeApi = axios.create({ baseURL })

export default cafeApi
