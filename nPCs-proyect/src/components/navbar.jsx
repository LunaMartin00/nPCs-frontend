// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // IMPORTANTE
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
} from 'reactstrap';
import './navbar.css';

import PC2Icon from '../assets/PC2.svg';
import CpuIcon from '../assets/cpu.svg';
import PCcomIcon from '../assets/PCcom.svg';

function Navigationbar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand="md" className="custom-navbar" {...args}>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto align-items-center" navbar>
          
          <NavItem>
            {/* Usamos tag={Link} para navegación rápida */}
            <NavLink tag={Link} to="/armar-pc" className="nav-link-custom">
              <img src={PC2Icon} alt="PC" className="nav-icon-svg" />
              Armar PC
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="nav-link-custom">
              <img src={CpuIcon} alt="CPU" className="nav-icon-svg" />
              Explorar Productos
            </DropdownToggle>
            <DropdownMenu>
              {/* Rutas corregidas para coincidir con el App.js */}
              <DropdownItem tag={Link} to="/explorar/cpu">Procesadores</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/motherboards">Motherboards</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/gpu">Tarjetas de video</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/memorias ram">Memorias RAM</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/almacenamiento">Almacenamiento</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/fuentes de poder">Fuentes de Poder</DropdownItem>
              <DropdownItem tag={Link} to="/explorar/gabinetes">Gabinetes</DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/explorar/todos">Ver Todos</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <NavLink tag={Link} to="/builds" className="nav-link-custom">
              <img src={PCcomIcon} alt="Builds" className="nav-icon-svg" />
              Builds de Usuarios
            </NavLink>
          </NavItem>
        </Nav>

        <InputGroup className="search-bar">
          <Input type="search" placeholder="Buscar productos..." className="search-input" />
        </InputGroup>
      </Collapse>
    </Navbar>
  );
}

export default Navigationbar;