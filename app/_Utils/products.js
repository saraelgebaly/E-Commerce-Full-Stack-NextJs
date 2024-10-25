import createAxios from "./axiosRequest"

const getProdutsList = ()=> createAxios.get('/products')
 const getProductById =  (id)=> createAxios.get(`/products/${id}`)

export default  {
    getProdutsList,
    getProductById,
}