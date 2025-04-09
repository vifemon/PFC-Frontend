import axios from "axios";
import { apiRegistro } from "./handleRegistro";

export const apiLogin = {
    baseURL: "/home/vicent/dockerXampp/arxius/projecte/login-validate.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

const handleLogin = async (formData) => {
    try {
        const response = await axios.post(apiLogin.baseURL, formData, {
            headers: apiRegistro.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}

export default handleLogin