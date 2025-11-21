import React from "react";
import logo from "../assets/Processor 1.svg";
import "../styles/App.css";

export default function Footer({ onShowAbout }) {
    return (

    <footer className = "footer">
        <div className = "container">
            <div className = 'footer_row'>
                    <div className = 'footer_section'>
                        <h4>Compañia </h4>
                        <ul>
                            <li> <a href = "#" onClick={(e)=>{e.preventDefault(); if(onShowAbout) onShowAbout();}}> Sobre nosotros </a></li>
                            <li> <a href = "#"> Carreras </a></li>
                            <li> <a href = "#"> Blog </a></li>
                            <li> <a href = "#"> Prensa </a></li>
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
                            <li> <a href = "#"> Iniciar sesion </a></li>
                            <li> <a href = "#"> Registrarse </a></li>
                        </ul>
                    </div>

                    <div className = 'footer_section'>
                    <img src={logo} alt="nPCs"  />

                        <div className = "footer_socials">
                            <br/>
                            <ul>
                                <a href="#"> <i className = "fab fa-facebook-f"></i></a>
                                <a href="#"> <i className = "fab fa-instagram"></i></a>
                                <a href="#"> <i className = "fab fa-twitter"></i></a>
                                <a href="#"> <i className = "fab fa-linkedin"></i></a>
                            </ul>
                        </div>      
                </div>
            </div>
        </div>
        </footer>
        )

}