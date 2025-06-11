import { useState } from "react";
import TabButton from "../components/Tab/TabButton";
import { ESPACIOS } from "../data/tab_espacios"; 
import "../components/Tab/tabButton.css"
import fondo from "../../assets/muestra.jpg"
import Navbar from "../components/Navbar/Navbar";

function TarifasPage() {

    const [selectedOption, setSelectedOption] = useState('sala_comun');
    let tabContent = <p></p>
    if (selectedOption) {
        tabContent = (
            <div className="tab-content">
                <h1>{ESPACIOS[selectedOption].title}</h1>
                <p>{ESPACIOS[selectedOption].description}</p>
                <div className="tab-img">
                    <div><img src={fondo} alt="" /></div>
                    <div><img src={fondo} alt="" /></div>
                    <div><img src={fondo} alt="" /></div>
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
                        <TabButton text="Oficina común" isSelected={selectedOption === 'sala_comun'} onSelect={() => handleSelect('sala_comun')}>Sala común</TabButton>
                        <TabButton text="Sala Sol" isSelected={selectedOption === 'sala_1'} onSelect={() => handleSelect('sala_1')}>Sala 1</TabButton>
                        <TabButton text="Sala Sombra" isSelected={selectedOption === 'sala_2'} onSelect={() => handleSelect('sala_2')}>Sala 2</TabButton>
                        <TabButton text="Otros espacios" isSelected={selectedOption === 'otros_espacios'} onSelect={() => handleSelect('otros_espacios')}>Otros espacios</TabButton>
                    </menu>
                    {tabContent}
                </section>
            </div>
        </>
    )

}

export default TarifasPage