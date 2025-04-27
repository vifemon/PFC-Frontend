import { useState } from "react"
import InputField from "../InputField/InputField"
import Button from "../Button/Button";
import { consultaSillas } from "../../service/bookingService";


function ReservaSillaForm() {
    const [seleccionFecha, setSeleccionFecha] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [franjas, setFranjas] = useState([])
    const [seleccionSillas, setSeleccionSillas] = useState({});
  


    const handleFecha = (e) => {
        setSeleccionFecha(e.target.value);
    }

    const validarFecha = () => {


        if (!seleccionFecha) {
            setErrorFecha("Debes introducir una fecha");
            return false
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fechaCheck = new Date(seleccionFecha);
        fechaCheck.setHours(0, 0, 0, 0)

        if (fechaCheck < today) {
            setErrorFecha("La fecha debe ser como mínimo la del día de hoy")
            return false
        }

        setErrorFecha("");
        return true;


    }

    const handleSubmitFecha = async () => {
        if (validarFecha()) {
            try {
                const formDate = new URLSearchParams;

                formDate.append('fecha', seleccionFecha)
                console.log('post', formDate)
                const res = await consultaSillas(formDate)
                console.log('res', res)
                setFranjas(res)

            } catch {
                console.log("Error a la hora de conseguir las franjas de sillas")
            }
        }
    }

    const handleReserva = () => {
       

            try {

                const idUsuario = sessionStorage.getItem('usuario_id')
                if (idUsuario === null) {

                }

                console.log('sillas', seleccionSillas)

                const formReserva = new URLSearchParams;
                formReserva.append('usuario_id', idUsuario)
                formReserva.append('fecha', seleccionFecha)

                



            } catch {
                console.log("Error con la reserva de sillas")
            }
        

    }

    return (
        <div>
            <InputField
                type="date"
                label="Fecha:"
                id="fecha"
                value={seleccionFecha}
                onChange={handleFecha}
                error={errorFecha} />

            <Button
                text="Comprobar disponibilidad"
                onClick={handleSubmitFecha}
            />
            {franjas.length > 0 && (
                <div>
                    <h3>Disponibilidad:</h3>
                    {franjas.map((dato, index) => (
                        <div key={index}>
                            <h4>{dato.hora_inicio}</h4>
                            <select
                                value={seleccionSillas[dato.hora_inicio] || ""}
                                onChange={(e) => {
                                    setSeleccionSillas({
                                        ...seleccionSillas,
                                        [dato.hora_inicio]: e.target.value
                                    });
                                    console.log("sele", seleccionSillas)
                                }}
                            >
                                <option value="">Selecciona cantidad</option>
                                {Array.from({ length: Math.min(dato.sillas_disponibles, 5) }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))};
                            </select>

                        </div>
                    ))}
                    {Object.keys(seleccionSillas).length > 0 && (  
                        <Button
                            text="Reservar"
                            onClick={handleReserva}
                        />
                    )}
                </div>



            )}


        </div>
    )
}

export default ReservaSillaForm