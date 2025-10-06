import React from "react";
import logo from "../assets/Logo.png"; 

export default function Navbar() {
  const goHome = () => (window.location.href = "/");

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    if (!q) return;
    console.log("Buscando:", q);
  };

  const bar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "12px 20px",
    background: "#021644",
    color: "#fff",
  };

  const center = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 0,
    maxWidth: 700,
    margin: "0 12px",
  };

  return (
    <header style={bar}>
      <button onClick={goHome} aria-label="Ir al inicio" style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}>
        <img src={logo} alt="nPCs" style={{ height: 44, display: "block" }} />
      </button>

      <form onSubmit={handleSearch} style={center}>
        <input
          type="text"
          name="search"
          placeholder="Buscar componentes…"
          aria-label="Buscar componentes"
          style={{
            flex: 1,
            minWidth: 240,
            padding: "10px 12px",
            border: "1px solid #334155",
            borderRight: "none",
            borderRadius: "10px 0 0 10px",
            outline: "none",
            background: "#0b1220",
            color: "#e5e7eb",
          }}
        />
        <button type="submit" style={{ border: "1px solid #334155", borderRadius: "0 10px 10px 0", padding: "10px 16px", fontWeight: 600, background: "#facc15", color: "#111827", cursor: "pointer" }}>
          Buscar
        </button>
      </form>

      <button onClick={goHome} style={{ border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontWeight: 600, background: "#0b1220", color: "#e5e7eb", cursor: "pointer" }}>
        Inicio
      </button>
    </header>
  );
}
