import React from "react";
import logo from "../../assets/Logo.svg";

import "../../styles/Header.css";

export default function ClientHeader({onLogout}) {
  const goHome = () => (window.location.href = "/homepage-cliente");

  return (
      <header className="header-bar">
        <button onClick={goHome} className="header-logo-button">
          <img src={logo} alt="nPCs" className="header-logo" />
        </button>

        <nav className="header-nav">
          <button className="header-link" onClick={onLogout}>
            Cerrar sesión
          </button>
        </nav>
      </header>

    
  );
}