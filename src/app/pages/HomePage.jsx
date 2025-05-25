import { useEffect, useRef } from "react";
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"
import Menu from "../components/Header/Menu"
import "../styles/homePage.css"

function HomePage() {
  

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="section " style= {{ backgroundColor: "blue" }}>
          <h1>Sección 1</h1>
        </div>
        <div className="section " style= {{ backgroundColor: "orange" }}>
          <h1>Sección 2</h1>
        </div>
        <div className="section " style= {{ backgroundColor: "green" }}>
          <h1>Sección 3</h1>
        </div>
        <div className="section " style= {{ backgroundColor: "pink" }}>
          <h1>Sección 4</h1>
        </div>
           
      </div>
    </>
  );
}
export default HomePage;