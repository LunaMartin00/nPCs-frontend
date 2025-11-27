// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Button
} from 'reactstrap';
import '../../styles/navbar.css';

import PC2Icon from '../../assets/PC2.svg';
import CpuIcon from '../../assets/cpu.svg';
import PCcomIcon from '../../assets/PCcom.svg';

function ClientNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  
  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Búsqueda en tiempo real
    if (value.length > 2) {
      try {
        const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(value)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error en búsqueda:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productName) => {
    navigate(`/cliente/search?q=${encodeURIComponent(productName)}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <Navbar dark expand="md" className="custom-navbar" {...args}>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto align-items-center" navbar>
          
          <NavItem>
            <NavLink tag={Link} to="/cliente/armar-pc" className="nav-link-custom">
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
              <DropdownItem tag={Link} to="/cliente/explorar/CPU">Procesadores</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/placas-madre">Motherboards</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/GPU">Tarjetas de video</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/memorias-ram">Memorias RAM</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/almacenamiento">Almacenamiento</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/fuentes-poder">Fuentes de Poder</DropdownItem>
              <DropdownItem tag={Link} to="/cliente/explorar/gabinetes">Gabinetes</DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/cliente/explorar/todos">Ver Todos</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <NavLink tag={Link} to="/cliente/builds" className="nav-link-custom">
              <img src={PCcomIcon} alt="Builds" className="nav-icon-svg" />
              Builds de Usuarios
            </NavLink>
          </NavItem>
        </Nav>

        <div className="search-container position-relative">
          <form onSubmit={handleSearch} className="d-flex">
            <InputGroup className="search-bar">
              <Input 
                type="search" 
                placeholder="Buscar productos..." 
                className="search-input"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button type="submit" className="search-btn">
                🔍
              </Button>
            </InputGroup>
          </form>

          {/* Sugerencias en tiempo real */}
          {suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map(product => (
                <div 
                  key={product.id} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(product.nombre)}
                >
                  <div className="suggestion-content">
                    <small className="suggestion-name">{product.nombre}</small>
                    <span className="suggestion-price">${product.precio}</span>
                  </div>
                  <small className="suggestion-store">{product.tienda}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

export default ClientNavbar;