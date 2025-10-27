import React, { useState } from 'react';
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
            <NavLink href="/armar-pc" className="nav-link-custom">
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
              <DropdownItem href="/productos/procesadores">Procesadores</DropdownItem>
              <DropdownItem href="/productos/placas-madre">Placas Madre</DropdownItem>
              <DropdownItem href="/productos/tarjetas-graficas">Tarjetas Gráficas</DropdownItem>
              <DropdownItem href="/productos/memorias">Memorias RAM</DropdownItem>
              <DropdownItem href="/productos/almacenamiento">Almacenamiento</DropdownItem>
              <DropdownItem href="/productos/fuentes">Fuentes de Poder</DropdownItem>
              <DropdownItem href="/productos/gabinetes">Gabinetes</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/productos/todos">Ver Todos</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/builds" className="nav-link-custom">
              <img src={PCcomIcon} alt="Builds" className="nav-icon-svg" />
              Builds de Usuarios
            </NavLink>
          </NavItem>
        </Nav>
        <InputGroup className="search-bar">
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="search-input"
          />
        </InputGroup>
      </Collapse>
    </Navbar>
  );
}

export default Navigationbar;