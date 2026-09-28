import axios from 'axios'

export const URL = 'http://localhost:3000'

export const API = axios.create({
    baseURL: URL
})