import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import '../styles/Accounts.css';
import { Link } from "react-router-dom";
import user from "../assets/user.svg";
import shop from "../assets/shop.svg";

export default function SignUp() {

    return (
    
        
        <Row className="row1">
            <h1>¿Que rol quieres desempeñar dentro de la página?</h1>
            <Col sm="6">
                <Card className = "custome-card" body>
                <CardTitle className = "custome-card-tittle" tag="h5">
                    Comprador
                </CardTitle>

                 <img src={user} alt="user" className="user-logo" />

                <CardText>
                    Ademas de poder ver nuestro catalogo tendrás acceso a la compra de este de manera directa.
                </CardText>
                <Link to = "/signup/cliente">
                    <Button className = "custome-buttom" >
                        Crear cuenta como comprador
                    </Button> 
                </Link>
                </Card>
            </Col>
            <Col sm="6">
                <Card className = "custome-card" body>
                <CardTitle className = "custome-card-tittle" tag="h5">
                    Tienda
                </CardTitle>

                <img src={shop} alt="shop" className="shop-logo" />

                <CardText>
                    Podras tener acceso a la compra de productos de nuestro catalogo mientras que podras unir tus productos a el.
                </CardText>
                <Link to = "/signup/tienda">
                    <Button className = "custome-buttom">
                        Crear cuenta como tienda
                    </Button>
                </Link>
                </Card>
            </Col>
        </Row>
    )
}
