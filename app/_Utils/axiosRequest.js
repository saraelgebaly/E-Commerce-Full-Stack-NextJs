import axios from "axios";
const baseUrl = "http://localhost:3000/api";
const createAxios = axios.create({
  baseURL: baseUrl,
  
});
export default createAxios;
