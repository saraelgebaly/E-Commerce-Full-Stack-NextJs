import axios from "axios";
const baseUrl = "http://127.0.0.1:3000/api";
const createAxios = axios.create({
  baseURL: baseUrl,
  
});
export default createAxios;
