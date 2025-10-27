import React from "react";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "24px", textAlign: "center" }}>
        <h1>AVANCE.</h1>
        <p>Aca iria todo lo que vayamos avanzando.</p>
      </main>
      <Footer />
    </div>
  );
}
