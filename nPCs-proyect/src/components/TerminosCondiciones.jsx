import React, { useEffect } from "react";

export default function TerminosCondiciones() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <main style={{ padding: "3rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", color: "#111" }}>
                <h1>Términos y condiciones</h1>
                <h3>Aceptación de los términos</h3>
                <p>
                    Al acceder y utilizar el sitio web nPCs, el usuario acepta cumplir con estos
                    términos y condiciones, nuestra política de privacidad y cualquier otra política aplicable.
                </p>

                <h3>Uso del sitio</h3>
                <p>
                    nPCs es una página que actúa como intermediario para comparar precios de componentes
                    de PC entre diferentes tiendas. El usuario se compromete a utilizar el sitio de manera
                    legal y ética, sin intentar dañar, sobrecargar o interferir con su funcionamiento.
                </p>

                <h3>Normas de conducta</h3>
                <p>Se compromete a no utilizar el sitio para:</p>
                <ul>
                    <li>Publicar contenido ilegal, ofensivo o que infrinja derechos de terceros.</li>
                    <li>Intentar acceder sin autorización a sistemas o datos.</li>
                    <li>Recopilar información personal de otros usuarios sin su consentimiento.</li>
                    <li>Vender productos robados, falsificados, dañados o que no sean de su legítima propiedad.</li>
                    <li>Utilizar la plataforma para enviar spam, mensajes no solicitados o publicidad masiva.</li>
                    <li>Acosar, intimidar o amenazar a otros usuarios o tiendas.</li>
                </ul>

                <h3>Contacto</h3>
                <p>
                    Si tienes preguntas sobre estos términos, contacta a soporte en
                    <a href="mailto:desarrollo.npcsoficial@gmail.com"> desarrollo.npcsoficial@gmail.com</a>.
                </p>
            </div>
        </main>
    );
}
