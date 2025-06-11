import { Presentation, MonitorCheck, IdCard, ClockPlus, Headset, Handshake } from 'lucide-react';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import Menu from "../components/Header/Menu"
import "../styles/homePage.css"
import fondo from "../../assets/muestra.jpg"
import video from "../../assets/0001-0100.mp4"
import Button from "../components/Button/Button"
import TabButton from "../components/Tab/TabButton";
import { ESPACIOS } from "../data/tab_espacios"; 
import "../components/Tab/tabButton.css"

function HomePage() {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const [hasShown, setHasShown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('sala_comun');
  let tabContent = <p></p>
  if (selectedOption) {
    tabContent = (
    <div className="tab-content">
              <h1>{ESPACIOS[selectedOption].title}</h1>
              <p>{ESPACIOS[selectedOption].description}</p>
              <div className="tab-img">
              <div><img src={fondo} alt="" /></div>
              <div className="hidden-img"><img src={fondo} alt="" /></div>
              <div className="hidden-img"><img src={fondo} alt="" /></div>
              </div>
              <div className="tab-contacto">
            <Headset size={35}  /> <h2>Concierta una visita con nosotros sin compromiso y conoce los espacios de primera mano</h2>
            </div>
            </div>
    )
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          setHasShown(true);
          observer.disconnect(); // Solo se ejecuta una vez
        }
      },
      { threshold: 0.5 }
    );

    if (overlayRef.current) {
      observer.observe(overlayRef.current);
    }

    return () => observer.disconnect();
  }, [hasShown]);

  const handleNavigate = () => {
    navigate("/reserva")
  }

  const handleSelect = (selectedButton) => {
    setSelectedOption(selectedButton)
  }


  return (
    <>
      <Navbar scrollContainerClass="home-container" />
      <div className="home-container">
        <div className="section " style={{ backgroundColor: "rgba(0, 78, 134)" }}>
          <div className="video-wrapper" ref={overlayRef}>
            <video autoPlay muted loop playsInline>
              <source src={video} type="video/mp4" />
            </video>
            <div className={`video-overlay ${hasShown ? "visible" : ""}`}>
              <h1>Descubre SolarHub</h1>
              <h3>Tu coworking en L'Horta Nord</h3>
              <Button
                text="Reservar"
                onClick={handleNavigate}
                variant="important" />

            </div>
          </div>
        </div>
        <div className="section " style={{ backgroundColor: "rgba(0, 112, 192)" }}>
          <section className="espacios-tab">
            <h2>Espacios</h2>
            <menu>
              <TabButton text="Espacio Coworking" isSelected={selectedOption === 'sala_comun'} onSelect={() => handleSelect('sala_comun')} />
              <TabButton text="Sala Sol" isSelected={selectedOption === 'sala_1'} onSelect={() => handleSelect('sala_1')}/>
              <TabButton text="Sala Sombra" isSelected={selectedOption === 'sala_2'} onSelect={() => handleSelect('sala_2')}/>
              <TabButton text="Otros espacios" isSelected={selectedOption === 'otros_espacios'} onSelect={() => handleSelect('otros_espacios')}/>
            </menu>
            {tabContent}
          </section>
        </div>
        
        <div className="section" style={{ backgroundColor: "rgba(0, 78, 134)" }}>
          <div className="tarifas-container">
            <div className="tarifas-item">
            <MonitorCheck size={48}  />
              <h3>Escritorio personalizado</h3>
            </div>
          
          
            <div className="tarifas-item tarifas-item__main">
            <Handshake size={48} color={"rgba(110, 195, 255)"} />
              <h3>Planes a medida</h3>
            </div>
            
        
            <div className="tarifas-item">
            <IdCard size={48}  />
              <h3>Suscripción mensual</h3>
            </div>
            
          
            <div className="tarifas-item">
            <ClockPlus size={48}  />
              <h3>Reserva por horas</h3>
            </div>
            
          
            <div className="tarifas-item">
            <Headset size={48}  />
              <h3>¿Necesitas ayuda?</h3>
            </div>
            
          
            <div className="tarifas-item">
            <Presentation size={48}  />
              <h3>Salas de reuniones</h3>
            </div>
          </div>
          
        </div>
        <div className="section " style={{ backgroundColor: "orange" }}>
          <img src={fondo} alt="" />
        </div>

      </div>
    </>
  );
}
export default HomePage;