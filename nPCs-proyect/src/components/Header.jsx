import React from "react";
import logo from "../assets/Logo.svg";

import "../styles/Header.css";

export default function Header({}) {
  const goHome = () => (window.location.href = "/");

  return (
           
    <header className="header-bar">
      <button onClick={goHome} className="header-logo-button">
        <img src={logo} alt="nPCs" className="header-logo" />
      </button>

    
      <nav className="header-nav">
        
            <button className="header-link" onClick={() => (window.location.href = "/signIn")}>
              Iniciar Sesión
            </button>
            <span className="header-divider">|</span>
            <button className="header-link" onClick={() => (window.location.href = "/register")}>
              Registrarse
            </button>
      </nav>
    </header>
    );
}