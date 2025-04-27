import axios from "axios";

export const apiConsultaSillas = {
    baseURL: "http://localhost:8080/arxius/projecte/reserva-sillas-query.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

 export const consultaSillas = async (formData) =>{
    try {
        const response = await axios.post(apiConsultaSillas.baseURL, formData, {
            headers: apiConsultaSillas.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}


export const apiReservaSillas = {
    baseURL: "http://localhost:8080/arxius/projecte/reserva-sillas-insert.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

 export const reservaSillas = async (formData) =>{
    try {
        const response = await axios.post(apiReservaSillas.baseURL, formData, {
            headers: apiReservaSillas.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}

export const apiReservaSalas = {
    baseURL: "http://localhost:8080/arxius/projecte/reserva-salas-insert.php",
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
},
}

 export const reservaSalas = async (formData) =>{
    try {
        const response = await axios.post(apiReservaSalas.baseURL, formData, {
            headers: apiReservaSalas.headers
        })
        return response.data
    } catch (error){
        console.log(error)
        throw error
    }
}


