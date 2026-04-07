import axios from 'axios';

const BASE_URL = 'https://superlabs-task.onrender.com/api';

export const productApi = {
    getProducts: (query = '', page = 1) =>
        axios.get(`${BASE_URL}/products?q=${query}&page=${page}`),

    getProductBySku: (sku) =>
        axios.get(`${BASE_URL}/products/${sku}`),

    createProduct: (productData) =>
        axios.post(`${BASE_URL}/products`, productData),

    updateProduct: (id, data) =>
        axios.put(`${BASE_URL}/products/${id}`, data),

    deleteProduct: (id) =>
        axios.delete(`${BASE_URL}/products/${id}`),

    addReview: (id, reviewData) => 
    axios.put(`${BASE_URL}/products/${id}/review`, reviewData)
};