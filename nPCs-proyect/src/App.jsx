import React from "react";
import Header from "./components/Header.jsx";
import Navigationbar from "./components/navbar.jsx"
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div>
      <Header/>
      <Navigationbar/>
      <main style={{ padding: "24px", textAlign: "center" }}>
        <h1>AVANCE.</h1>
        <p>Aca iria todo lo que vayamos avanzando.</p>
      </main>
      <Footer />
    </div>
  );
}
