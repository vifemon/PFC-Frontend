import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { Link } from "react-router-dom"

const Navbar = ({ scrollContainerClass = '' }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [atTop, setAtTop] = useState(true);
    const isLogged = sessionStorage.getItem('usuario');
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const container = scrollContainerClass
          ? document.querySelector(`.${scrollContainerClass}`)
          : window;
    
        if (!container || typeof container.addEventListener !== 'function') return;
    
        const handleScroll = () => {
          const currentY =
            container === window
              ? window.scrollY
              : container.scrollTop;
    
          setShowNavbar(currentY < lastScrollY || currentY <= 0);
          setLastScrollY(currentY);
          setAtTop(currentY === 0);
        };
    
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }, [lastScrollY, scrollContainerClass]);

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault(); // evitar navegación redundante
            const container = document.querySelector('.home-container');
            if (container) {
                container.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate('/');
        }
    };

    return (
        <nav
            className={`navbar ${showNavbar ? 'visible' : 'hidden'} ${atTop ? 'transparent' : 'solid'
                } ${atTop ? 'text-light' : 'text-dark'}`}
        >
             <div className="logo">
                <Link to="/" onClick={handleHomeClick}>Home</Link>
            </div>
            <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                <div className={`bar ${menuOpen ? 'rotate1' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'fade' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'rotate2' : ''}`}></div>
            </button>
            <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
                <a href="#">Espacios</a>
                <a href="#">Tarifas</a>
                <a href="#">Contacto</a>
                <Link to="/reserva">Reserva</Link>
            </div>
            <div>
                {isLogged ? (
                    <Link to="/miperfil">Mi perfil</Link>
                ) : (
                    <Link to="/login">Mi perfil</Link>)}
            </div>
        </nav>
    );
};

export default Navbar;
