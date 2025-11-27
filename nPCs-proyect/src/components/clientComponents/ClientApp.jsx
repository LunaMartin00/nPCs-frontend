import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import ClientHeader from "./ClientHeader.jsx";
import Navigationbar from "./ClientNavbar.jsx";
import Footer from "./ClientFooter.jsx";
import ProductList from "../productList.jsx";
import ArmarPC from "../ArmarPC.jsx";
import UserBuilds from "../UserBuilds.jsx";

import logo from "../../assets/Logo.svg";
import "../../styles/App.css";

export default function ClientApp() {
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  function handleShowAbout() {
    setShowAbout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
    window.location.reload(); // Recargar para resetear el estado
  };

  const HomeContent = () => (
    <>
      {showAbout ? (
        <main className="hero about">
          <div className="hero-content">
            <h1>
              <img src={logo} alt="nPCs logo" className="hero-inline-logo" />
            </h1>
            <p>
              En nPCs somos una tienda dedicada a ofrecer componentes de alta calidad para
              construcciones de PC a medida. Nuestro objetivo es brindar asesoría personalizada,
              envío rápido y piezas compatibles y probadas. Si quieres armar tu PC ideal,
              podemos ayudarte a elegir las partes correctas según tu presupuesto y uso.
            </p>
          </div>
        </main>
      ) : (
        <main className="hero">
          <div className="hero-content">
            <h1>Bienvenido Cliente a <img src={logo} alt="nPCs logo" className="hero-inline-logo" /></h1>
            <h2>Tu área personal de componentes de PC.</h2>
            <p>Accede a tus builds guardados, favoritos y recomendaciones personalizadas.</p>
            <Link to="/cliente/armar-pc" className="boton">Montar PC</Link>
          </div>
        </main>
      )}
    </>
  );

  return (
    <div className="app-container">
      <ClientHeader onLogout={handleLogout} />
      <Navigationbar isLoggedIn={true} userRole="cliente" onLogout={handleLogout} />

      <Routes>
        {/* Ruta de Inicio para cliente */}
        <Route path="/homepage-cliente" element={<HomeContent />} />

        {/* Rutas específicas para cliente */}
        <Route path="/cliente/explorar/:categoria" element={<ProductList />} />
        <Route path="/cliente/productos/todos" element={<ProductList />} />
        <Route path="/cliente/armar-pc" element={<ArmarPC />} />
        <Route path="/cliente/builds" element={<UserBuilds/>} 
        />

        <Route path="*" element={<HomeContent />} />
      </Routes>

      <Footer onShowAbout={handleShowAbout} />
    </div>
  );
}