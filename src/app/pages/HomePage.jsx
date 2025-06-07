import { useEffect, useState, useRef } from "react";
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import Menu from "../components/Header/Menu"
import "../styles/homePage.css"
import fondo from "../../assets/muestra.jpg"
import video from "../../assets/0001-0100.mp4"
import Button from "../components/Button/Button"

function HomePage() {

  const overlayRef = useRef(null);
  const [hasShown, setHasShown] = useState(false);

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

const handleAlert = () => {
  alert("yeeeeee")
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
              onClick={handleAlert}
              variant="important"/>
            </div>
          </div>
        </div>
        <div className="section " style={{ backgroundColor: "orange" }}>
          <img src={fondo} alt="" />
        </div>
        <div className="section " style={{ backgroundColor: "green" }}>
          <h1>Sección 3</h1>
        </div>
        <div className="section " style={{ backgroundColor: "pink" }}>
          <h1>Sección 4</h1>
        </div>

      </div>
    </>
  );
}
export default HomePage;