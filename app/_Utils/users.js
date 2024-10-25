import createAxios from "./axiosRequest";

const login = (payload) => createAxios.post("/login",payload);
const register = (payload) => createAxios.post("/register",payload);

export default {
    login,
    register
};
