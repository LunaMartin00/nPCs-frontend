import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Processor 1.svg";
import "../styles/App.css";

export default function Footer({ onShowAbout }) {
    return (

    <footer className = "footer footer--small">
        <div className = "container">
            <div className = 'footer_row'>
                    <div className = 'footer_section'>
                        <h4>Compañia </h4>
                        <ul>
                            <li> <a href = "#" onClick={(e)=>{e.preventDefault(); if(onShowAbout) onShowAbout();}}> Sobre nosotros </a></li>
                            <li> <Link to="/armar-pc" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}> Productos </Link></li>
                            <li> <Link to="/politicas-de-privacidad" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}> Políticas de privacidad </Link></li>
                            <li> <Link to="/terminos-y-condiciones" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}> Términos y condiciones </Link></li>
                        </ul>
                    
                    </div>
                    <div className = 'footer_section'>
                        <h4>Nuestros productos</h4>
                        <ul>
                            <li> <a href = "#"> CPU </a></li>
                            <li> <a href = "#"> GPU </a></li>
                            <li> <a href = "#"> RAM </a></li>
                            <li> <a href = "#"> Almacenamiento </a></li>
                        </ul>
                    </div>

                    <div className = 'footer_section'>
                        <h4>Cuenta</h4>
                        <ul>
                            <li> <a href = "/signIn"> Iniciar sesion </a></li>
                            <li> <a href = "/register"> Registrarse </a></li>
                        </ul>
                    </div>

                    <div className = 'footer_section'>
                    <img src={logo} alt="nPCs"  />

                        <div className = "footer_socials">
                            <br/>
                            <ul>
                                <a href="#"> <i className = "fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/npcsoficial/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"> <i className = "fab fa-instagram" aria-hidden="true"></i></a>
                                <a href="https://x.com/nPcsoficial" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter"> <i className = "fab fa-twitter" aria-hidden="true"></i></a>
                                <a href="https://www.linkedin.com/in/npcs-oficial/" target="_blank" rel="noopener noreferrer" title="Linkedin" aria-label="Linkedin"> <i className = "fab fa-linkedin" aria-hidden="true"></i></a>
                            </ul>
                        </div>      
                </div>
            </div>
        </div>
        </footer>
        )

}