import Button from "../Button/Button"

function ReservaSalaForm() {

    const handleReserva = () =>{
        console.log("Gestionar envio de datos a back de la reserva")
    }


    return (
        <div>
            <select name="" id="">Selecciona sala
                <option value="">Sala 1</option>
                <option value="">Sala 2</option>
            </select>
            <input type="date" />
            <select name="" id="">Selecciona hora inicio
                <option value="">8:00</option>
            </select>
            <select name="" id="">Selecciona hora fin
                <option value="">9:00</option>
            </select>
            <Button
                text="Reservar"
                onClick={handleReserva}
            />

        </div>
    )
}

export default ReservaSalaForm