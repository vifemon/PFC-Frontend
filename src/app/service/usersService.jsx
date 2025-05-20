import axios from "axios";

const apiRegistro = {
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

const apiLogin = {
    baseURL: "http://localhost:8080/arxius/projecte/login-validacion.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

export const loginValidate = async (formData) => {
    try {
        const response = await axios.post(apiLogin.baseURL, formData, {
            headers: apiLogin.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}

const apiMiPerfilMostrar = {
    baseURL: "http://localhost:8080/arxius/projecte/mi-perfil-query.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

export const miPerfilMostrar = async (formData) => {
    try {
        const response = await axios.post(apiMiPerfilMostrar.baseURL, formData, {
            headers: apiMiPerfilMostrar.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}


const apiEditarDatos = {
    baseURL: "http://localhost:8080/arxius/projecte/datos-update.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

export const editarDatos = async (formData) => {
    try {
        const response = await axios.post(apiEditarDatos.baseURL, formData, {
            headers: apiEditarDatos.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}
 