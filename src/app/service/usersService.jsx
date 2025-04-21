import axios from "axios";

export const apiRegistro = {
    baseURL: "http://localhost:8080/arxius/projecte/registro-insert.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

 export const handleRegistro = async (formData) =>{
    try {
        const response = await axios.post(apiRegistro.baseURL, formData, {
            headers: apiRegistro.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}

export const apiLogin = {
    baseURL: "http://localhost:8080/arxius/projecte/login-validacion.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

export const loginValidate = async (formData) => {
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

 