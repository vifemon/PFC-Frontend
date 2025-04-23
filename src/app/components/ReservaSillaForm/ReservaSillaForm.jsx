import { useState } from "react"
import InputField from "../InputField/InputField"
import Button from "../Button/Button";


function ReservaSillaForm() {
    const [seleccionFecha, setSeleccionFecha] = useState("");
    const [errorFecha, setErrorFecha] = useState("");

    const handleFecha = (e) => {
        setSeleccionFecha(e.target.value);
    }

    const validarFecha = () => {
    

        if (!seleccionFecha) setErrorFecha("Debes introducir una fecha");

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const fechaCheck = new Date(seleccionFecha);
        fechaCheck.setHours(0, 0, 0, 0)

        if (fechaCheck < today) setErrorFecha("La fecha debe ser como mínimo la del día de hoy")

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
                onClick={validarFecha}
            />
        </div>
    )
}

export default ReservaSillaForm