import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Navigationbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductList from "./components/productList.jsx";
import SignUp from "./components/SignUp.jsx";
import SignUpClient from "./components/SignUpClient.jsx";
import SignUpShop from "./components/SignUpShop.jsx";
import ArmarPC from "./components/ArmarPC.jsx";
import SignIn from "./components/SignIn.jsx"; 
import ClientApp from "./components/clientComponents/ClientApp.jsx";
import ShopApp from "./components/storeComponents/StoreApp.jsx"; 
import PoliticasPrivacidad from "./components/PoliticasPrivacidad.jsx";
import TerminosCondiciones from "./components/TerminosCondiciones.jsx";
import SearchResults from "./components/searchResults.jsx";
import UserBuilds from "./components/UserBuilds.jsx";

import logo from "./assets/Logo.svg";
import "./styles/App.css";

// Componente para la aplicación pública COMPLETA
const PublicApp = ({ onShowAbout, showAbout, onLogin, onRegister }) => {
  const PublicHomePage = () => {
    return (
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
  };

  return (
    <div className="app-container">
      <Header onShowAbout={onShowAbout} />
      <Navigationbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicHomePage 
              onShowAbout={onShowAbout}
              showAbout={showAbout}
            />
          } 
        />
        <Route path="/register" element={<SignUp />} />
        <Route path="/signin" element={<SignIn onLogin={onLogin} />} />
        <Route path="/signup/cliente" element={<SignUpClient onRegister={onRegister} />} />
        <Route path="/signup/tienda" element={<SignUpShop onRegister={onRegister} />} />
        <Route path="/explorar/:categoria" element={<ProductList />} />
        <Route path="/productos/todos" element={<ProductList />} />
        <Route path="/armar-pc" element={<ArmarPC />} />
        <Route path="/politicas-de-privacidad" element={<PoliticasPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/builds" element={<UserBuilds />} 
      />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <Footer onShowAbout={onShowAbout} />
    </div>
  );
};

// Componente para la aplicación cliente
const ClientAppWrapper = ({ onLogout }) => {
  return (
    <Routes>
      <Route 
        path="/cliente/*" 
        element={<ClientApp onLogout={onLogout} />} 
      />
      {/* Redirigir cualquier ruta desconocida al homepage del cliente */}
      <Route path="*" element={<Navigate to="/cliente/homepage-cliente" />} />
    </Routes>
  );
};

// Componente para la aplicación tienda
const StoreAppWrapper = ({ onLogout }) => {
  return (
    <Routes>
      <Route 
        path="/tienda/*" 
        element={<ShopApp onLogout={onLogout} />} 
      />
      {/* Redirigir cualquier ruta desconocida al homepage de la tienda */}
      <Route path="*" element={<Navigate to="/tienda/homepage-tienda" />} />
    </Routes>
  );
};

const PrivateApp = ({ userRole, onLogout }) => {
  if (userRole === 'cliente') {
    return <ClientAppWrapper onLogout={onLogout} />;
  } else if (userRole === 'encargado de tienda') {
    return <StoreAppWrapper onLogout={onLogout} />;
  } else {
    onLogout();
    return null;
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  function handleShowAbout() {
    setShowAbout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

    useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
    
    if (token && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (role, email, token) => {
    setIsLoggedIn(true);
    setUserRole(role);

    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  const handleRegister = (role, email, token) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', token);
  };

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>Cargando...</div>;
  }

  return (
    <Router>
      {isLoggedIn ? (
        <PrivateApp 
          userRole={userRole} 
          onLogout={handleLogout} 
        />
      ) : (
        <PublicApp 
          onShowAbout={handleShowAbout}
          showAbout={showAbout}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </Router>
  );
}