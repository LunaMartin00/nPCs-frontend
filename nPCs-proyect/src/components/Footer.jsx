import logo from "../assets/Logo.png";
import '../styles/App.css';

export default Footer

function Footer() {


    return (

    <footer className = "footer">
        <div className = "container">
            <div className = 'footer_row'>
                    <div className = 'footer_section'>
                        <h4>Compañia </h4>
                        <ul>
                            <li> <a href = "#"> Sobre nosotros </a></li>
                            <li> <a href = "#"> Carreras </a></li>
                            <li> <a href = "#"> Blog </a></li>
                            <li> <a href = "#"> Prensa </a></li>
                        </ul>
                    
                    </div>
                    <div className = 'footer_section'>
                        <h4>Nuestros productos</h4>
                        <ul>
                            <li> <a href = "#"> CPU </a></li>
                            <li> <a href = "#"> GPU </a></li>
                            <li> <a href = "#"> RAM </a></li>
                            <li> <a href = "#"> Almacenamiento </a></li>
                        </ul>
                    </div>

                    <div className = 'footer_section'>
                        <h4>Cuenta</h4>
                        <ul>
                            <li> <a href = "#"> Iniciar sesion </a></li>
                            <li> <a href = "#"> Registrarse </a></li>
                        </ul>
                    </div>

                    <div className = 'footer_section'>
                    <img src={logo} alt="nPCs" style={{ height: 44, display: "block" }} />
                        <div className = "footer_socials">
                            <ul>
                                <a href="#"> <i className = "fab fa-facebook-f"></i></a>
                                <a href="#"> <i className = "fab fa-instragram"></i></a>
                                <a href="#"> <i className = "fab fa-twitter"></i></a>
                                <a href="#"> <i className = "fab fa-linkedin"></i></a>
                            </ul>
                        </div>      
                </div>
            </div>
        </div>
    </footer>

    
    )


}