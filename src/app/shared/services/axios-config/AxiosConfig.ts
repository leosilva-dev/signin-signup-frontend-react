import axios from 'axios'

export const Api = axios.create({
    baseURL: 'https://1c034286f3b1.ngrok.io/api'
})