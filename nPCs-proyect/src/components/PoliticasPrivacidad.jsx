import React, { useEffect } from "react";

export default function PoliticasPrivacidad() {
  useEffect(() => {
    // Asegura que la página se coloque al tope cuando se monta
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main style={{ padding: "3rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", color: "#111" }}>
        <h1>Políticas de privacidad</h1>
        <p>
          En nPCs, valoramos tu privacidad y nos comprometemos a proteger tu información
          personal. Esta política describe cómo recopilamos, usamos y protegemos tus datos
          cuando utilizas nuestro sitio web y nuestros servicios.
          
          Al registrarte o realizar una compra en nPCs, aceptas las prácticas descritas en esta
          política de privacidad.
        </p>

        <h3>Datos personales</h3>
        <p>
          Recopilamos únicamente la información necesaria para procesar pedidos y
          mejorar la experiencia. No compartimos tus datos con terceros sin tu
          consentimiento, salvo lo requerido por la ley.
        </p>
        <ul>
          <li><strong>Información y registro:</strong> Cuando creas una cuenta, recopilamos tu nombre, correo electrónico y detalles de contacto.</li>
          <li><strong>Información de perfil:</strong> Si eres un vendedor, recopilamos información adicional relevante para tu tienda.</li>
        </ul>

        <h3>Seguridad de pagos</h3>
        <p>
          Usamos proveedores de pago confiables y prácticas recomendadas para proteger
          la información financiera durante las transacciones en línea
        </p>

        <h3>Contacto</h3>
        <p>
          Si tienes dudas sobre nuestras políticas de privacidad o quieres solicitar la
          eliminación de tus datos, contacta al soporte en <a href="mailto:desarrollo.npcsoficial@gmail.com">desarrollo.npcsoficial@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
