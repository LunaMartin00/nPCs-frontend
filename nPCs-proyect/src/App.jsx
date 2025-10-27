import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Navigationbar from "./components/navbar.jsx"
import Footer from "./components/Footer.jsx";
import logo from "./assets/Logo.svg";
import "./styles/App.css";

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  function handleShowAbout() {
    setShowAbout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <Header/>
      <Navigationbar/>
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
            <button className="boton">Montar PC</button>
          </div>
        </main>
      )}
      <Footer onShowAbout={handleShowAbout} />
    </div>
  );
}
