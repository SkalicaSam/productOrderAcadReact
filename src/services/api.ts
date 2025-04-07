import axios from "axios"

const api = axios.create({
    // baseURL: 'http://localhost:8080',
    // baseURL: 'http://127.0.0.1:8080',
    baseURL: import.meta.env.VITE_API_URL,

})

export const getAuthors = () => api.get('/author')

export const addAuthor = (name: string)  => api.post('/author', {name})

export const getProducts = () => api.get('/product')

export const addProduct = (name: string, price: number)  => api.post('/product', {name, price})

export const getProduct = (id: string) => api.get(`/product/${id}`);