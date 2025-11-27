import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Processor 1.svg";
import "../styles/App.css";

export default function Footer({ onShowAbout }) {
    // Verificar si el usuario está autenticado usando isLoggedIn (mismo criterio que App.jsx)
    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        window.location.href = '/';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer footer--small">
            <div className="container">
                <div className='footer_row'>
                    <div className='footer_section'>
                        <h4>Compañia</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if (onShowAbout) onShowAbout(); }}>Sobre nosotros</a></li>
                            <li><Link to="/armar-pc" onClick={handleScrollToTop}>Productos</Link></li>
                            <li><Link to="/politicas-de-privacidad" onClick={handleScrollToTop}>Políticas de privacidad</Link></li>
                            <li><Link to="/terminos-y-condiciones" onClick={handleScrollToTop}>Términos y condiciones</Link></li>
                        </ul>
                    </div>
                    
                    <div className='footer_section'>
                        <h4>Nuestros productos</h4>
                        <ul>
                            <li><Link to="/armar-pc" onClick={handleScrollToTop}>CPU</Link></li>
                            <li><Link to="/armar-pc" onClick={handleScrollToTop}>GPU</Link></li>
                            <li><Link to="/armar-pc" onClick={handleScrollToTop}>RAM</Link></li>
                            <li><Link to="/armar-pc" onClick={handleScrollToTop}>Almacenamiento</Link></li>
                        </ul>
                    </div>

                    <div className='footer_section'>
                        <h4>Cuenta</h4>
                        <ul>
                            {isLoggedIn ? (
                                <>
                                    <li><Link to="/homepage-cliente" onClick={handleScrollToTop}>Mi perfil</Link></li>
                                    <li><Link to="/historial-compras" onClick={handleScrollToTop}>Mis compras</Link></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Cerrar sesión</a></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/signin" onClick={handleScrollToTop}>Iniciar sesión</Link></li>
                                    <li><Link to="/register" onClick={handleScrollToTop}>Registrarse</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className='footer_section'>
                        <img src={logo} alt="nPCs" />
                        <div className="footer_socials">
                            <br/>
                            <ul>
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/npcsoficial/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                                <a href="https://x.com/nPcsoficial" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                                <a href="https://www.linkedin.com/in/npcs-oficial/" target="_blank" rel="noopener noreferrer" title="Linkedin" aria-label="Linkedin"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
                            </ul>
                        </div>      
                    </div>
                </div>
            </div>
        </footer>
    );
}