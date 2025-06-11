import { useState } from "react";
import TabButton from "../components/Tab/TabButton";
import { TARIFAS } from "../data/tab_tarifas"; 
import "../components/Tab/tabButton.css"
import fondo from "../../assets/muestra.jpg"
import Navbar from "../components/Navbar/Navbar";

function TarifasPage() {

    const [selectedOption, setSelectedOption] = useState('tarifa_general');
    let tabContent = <p></p>
    if (selectedOption) {
        tabContent = (
            <div className="tab-content">
                <h1>{TARIFAS[selectedOption].title}</h1>
                <p>{TARIFAS[selectedOption].description}</p>
                <h1>{TARIFAS[selectedOption].price}</h1>
                <div className="tab-img">
                    <div><img src={TARIFAS[selectedOption].image} alt="" /></div>
                </div>
            </div>
        )
    }

    const handleSelect = (selectedButton) => {
        setSelectedOption(selectedButton)
    }

    return (

        <>
            <Navbar />
            <div className="main-container">
                <section className="espacios-tab">
                    <h2>Espacios</h2>
                    <menu>
                        <TabButton text="Tarifa General Mensual" isSelected={selectedOption === 'tarifa_general'} onSelect={() => handleSelect('tarifa_general')}/>
                        <TabButton text="Tarifa Puesto Flexible" isSelected={selectedOption === 'tarifa_flexible'} onSelect={() => handleSelect('tarifa_flexible')}/>
                        <TabButton text="Reserva por Horas" isSelected={selectedOption === 'reserva_horas'} onSelect={() => handleSelect('reserva_horas')}/>
                        <TabButton text="Reserva de Oficinas" isSelected={selectedOption === 'reserva_salas'} onSelect={() => handleSelect('reserva_salas')}/>
                    </menu>
                    {tabContent}
                </section>
            </div>
        </>
    )

}

export default TarifasPage