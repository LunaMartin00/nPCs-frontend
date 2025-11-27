import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Header from "./components/Header.jsx";
import Navigationbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductList from "./components/productList.jsx";
import SignUp from "./components/SignUp.jsx";
import SignUpClient from "./components/SignUpClient.jsx";
import SignUpShop from "./components/SignUpShop.jsx";
import ArmarPC from "./components/ArmarPC.jsx";
import SignIn from "./components/SignIn.jsx"; 
import PoliticasPrivacidad from "./components/PoliticasPrivacidad.jsx";
import TerminosCondiciones from "./components/TerminosCondiciones.jsx";


import logo from "./assets/Logo.svg";
import "./styles/App.css";

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  function handleShowAbout() {
    setShowAbout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


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
            <h1>Bienvenidos a <img src={logo} alt="nPCs logo" className="hero-inline-logo" /></h1>
            <h2>Tu tienda de componentes de PC de confianza.</h2>
            <p>Ofrecemos una amplia variedad de componentes
              de alta calidad para que puedas armar tu PC ideal.</p>
            <Link to="/armar-pc" className="boton" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Montar PC</Link>
          </div>
        </main>
      )}
    </>
  );

  return (
    <Router>
      <div className="app-container">


        <Header />
        <Navigationbar />


        <Routes>
          {/* 1. Ruta de Inicio */}
          <Route path="/" element={<HomeContent />} />

          {/* 2. Rutas de Registro */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup/cliente" element={<SignUpClient />} />
          <Route path="/signup/tienda" element={<SignUpShop />} />

          {/* 3. Rutas del Comparador de Productos */}
          <Route path="/explorar/:categoria" element={<ProductList />} />

          {/* 4. Rutas Extra (Placeholders o Redirecciones) */}
          <Route path="/productos/todos" element={<ProductList />} />
          <Route path="/armar-pc" element={<ArmarPC />} />
          <Route path="/politicas-de-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
          <Route path="/builds" element={<div style={{ padding: "5rem", textAlign: "center", color: "white" }}><h2>Próximamente: Builds de Usuarios</h2></div>} />

        </Routes>

        <Footer onShowAbout={handleShowAbout} />

      </div>
    </Router>
  );
}