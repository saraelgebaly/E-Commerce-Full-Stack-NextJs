import createAxios from "./axiosRequest";

const addToCart = (payload) => createAxios.post("/product-cart", payload);
const getCartByUser = (email)=> createAxios.get(`/product-cart?email=${email}`);
const deleteCart = (id) => createAxios.delete(`/product-cart/${id}`)
export default {
  addToCart,
  getCartByUser,
  deleteCart
}; 
