import React, { useState, useEffect } from 'react';
import './menu.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Controla dirección de scroll
      setShowNavbar(currentY < lastScrollY || currentY <= 0);
      setLastScrollY(currentY);

      // Controla si está en la parte superior
      setAtTop(currentY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
    className={`navbar ${showNavbar ? 'visible' : 'hidden'} ${
      atTop ? 'transparent' : 'solid'
    } ${atTop ? 'text-dark' : 'text-light'}`}
  >
      <div className="logo">Mi Sitio</div>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={`bar ${menuOpen ? 'rotate1' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'fade' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'rotate2' : ''}`}></div>
      </button>
      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <a href="#">Inicio</a>
        <a href="#">Servicios</a>
        <a href="#">Acerca</a>
        <a href="#">Contacto</a>
      </div>
    </nav>
  );
};

export default Navbar;
