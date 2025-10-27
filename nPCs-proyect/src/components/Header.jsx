import React from "react";
import logo from "../assets/Logo.svg";

export default function Header() {
  const goHome = () => (window.location.href = "/");

  const bar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 40px",
    background: "#ffffff",
    color: "#1a1a1a",
    borderBottom: "2px solid #021644"
  };

  const right = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "14px",
    fontWeight: 500
  };

  const link = {
    cursor: "pointer",
    background: "transparent",
    border: 0,
    color: "#1a1a1a",
    padding: 0,
    fontSize: "14px"
  };

  const dividir = { color: "#b0b0b0" };

  return (
    <header style={bar}>
      <button onClick={goHome} style={{ background: "transparent", border: 0, cursor: "pointer" }}>
        <img src={logo} alt="OnPCs" style={{ height: 44 }} />
      </button>

      <nav style={right}>
        <button style={link} onClick={() => (window.location.href = "/login")}>
          Iniciar Sesión
        </button>
        <span style={dividir}>|</span>
        <button style={link} onClick={() => (window.location.href = "/register")}>
          Registrarse
        </button>
      </nav>
    </header>
  );
}
