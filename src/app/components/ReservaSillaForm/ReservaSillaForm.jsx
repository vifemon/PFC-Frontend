import { toast } from 'react-hot-toast';
import { useState, useEffect } from "react"
import InputField from "../InputField/InputField"
import Button from "../Button/Button";
import { consultaSillas, reservaSillas } from "../../service/bookingService";
import { useNavigate } from "react-router-dom";
import '../../styles/reservaForm.css'


function ReservaSillaForm() {
    const [seleccionFecha, setSeleccionFecha] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [franjas, setFranjas] = useState([])
    const [seleccionSillas, setSeleccionSillas] = useState({})
    const [reservaRealizada, setReservaRealizada] = useState(false)
    const [todoElDia, setTodoElDia] = useState(false)
    const [seleccionTodoEldia, setSeleccionTodoElDia] = useState({})
    const [errorCantidadSillasTodoElDia, setErrorCantidadSillasTodoElDia] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setReservaRealizada(false);
    }, [seleccionFecha]);


    const handleFecha = (e) => {
        setSeleccionFecha(e.target.value);
    }

    const handleCheckBox = (e) => {
        setTodoElDia(e.target.checked)
        console.log(todoElDia)
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

    const handleReserva = async () => {

        try {

            const idUsuario = sessionStorage.getItem('usuario_id')
            if (idUsuario === null) {
                toast.error('Primero debes iniciar sesión');
                navigate("/login")
            }

            console.log('sillas', seleccionSillas)

            const formReserva = new URLSearchParams;
            formReserva.append('usuario_id', idUsuario)
            formReserva.append('fecha', seleccionFecha)
            formReserva.append('reservas', JSON.stringify(seleccionSillas))

            const res = await reservaSillas(formReserva)

            if (res.success === true) {
                setReservaRealizada(true)
                setSeleccionSillas({});
                setFranjas([]);

            } else {
                console.log(res.error)
            }



        } catch {
            console.log("Error con la reserva de sillas")
        }
    }

    const handleReservaTodoElDia = async () => {
        try {

            const idUsuario = sessionStorage.getItem('usuario_id')
            if (idUsuario === null) {
                toast.error('Primero debes iniciar sesión');
                navigate("/login")
            }

            if(!seleccionTodoEldia.cantidad_sillas){
                setErrorCantidadSillasTodoElDia("Debes seleccionar una cantidad de sillas");
                return
            }

            const reservaTodo = {
                ...seleccionTodoEldia,
                hora_inicio: "08:00",
                hora_fin: "22:00"
              };

            const formReserva = new URLSearchParams;
            formReserva.append('usuario_id', idUsuario)
            formReserva.append('fecha', seleccionFecha)
            formReserva.append('reservaTodoElDia', JSON.stringify(reservaTodo))

            const res = await reservaSillas(formReserva)

            if (res.success === true) {
                setReservaRealizada(true)


            } else {
                console.log(res.error)
            }



        } catch {
            console.log("Error con la reserva de sillas")
        }
    }

    return (
        <div className= "form-container__inputs">
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
                    <div className="checkbox-container">
                        <InputField
                            className="allDay-checkbox"
                            type="checkbox"
                            label="Reservar todo el dia"
                            id="todoElDia"
                            checked={todoElDia}
                            onChange={handleCheckBox}
                        />
                    </div>
                    {todoElDia === true ? (
                        <div className="form-container__inputs">
                            <label htmlFor="cantidad_sillas">Selecciona cantidad</label>
                            <select
                                id="cantidad_sillas"
                                onChange={(e) => {
                                    setSeleccionTodoElDia(prev => ({
                                        ...prev,
                                        cantidad_sillas: e.target.value
                                    }));
                                    setErrorCantidadSillasTodoElDia("");
                                }}
                            >
                                <option value="">Selecciona cantidad</option>
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            {errorCantidadSillasTodoElDia && <span className="mensaje-error">{errorCantidadSillasTodoElDia}</span>}
                            <Button
                                text="Reservar"
                                onClick={handleReservaTodoElDia}
                            />
                        </div>
                    ) : (
                        <>
                            {franjas.map((dato, index) => (
                                <div key={index} className="franja-container">
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
                                        {Array.from({ length: Math.min(dato.sillas_disponibles, 6) }, (_, i) => (
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
                        </>
                    )}
                </div>



            )}
            {reservaRealizada === true && (
                <div>
                    <h2>Reserva realizada con éxito</h2>
                </div>
            )}

        </div>
    )
}

export default ReservaSillaForm