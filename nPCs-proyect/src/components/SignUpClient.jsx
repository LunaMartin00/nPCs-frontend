import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function SignupForm  () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstNames: '',
    lastNames: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones frontend
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      
      const userData = {
        firstNames: formData.firstNames,
        lastNames: formData.lastNames,
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post('http://localhost:5000/signUp/cliente', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      console.log('Usuario creado:', data);
      
      navigate('/');

      setFormData({
        firstNames: '',
        lastNames: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      });

    } catch (err) {
      console.error('Error al registrar usuario:', err);
      
      // Manejar diferentes tipos de errores
      if (err.response) {
        // Error del servidor (400, 409, 500, etc.)
        setError(err.response.data.message || 'Error al registrar usuario');
      } else if (err.request) {
        // Error de conexión
        setError('No se pudo conectar con el servidor');
      } else {
        // Otros errores
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Regístrar usuario</h1>
    

        <form onSubmit={handleSubmit} className="signup-form">
        <div className= "form-row">
          <div className="form-group">
            <label htmlFor="firstNames"> Nombres </label>
            <input
              type="firstNames"
              id="firstNames"
              name="firstNames"
              value={formData.firstNames}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastNames"> Apellidos </label>
            <input
              type="lastNames"
              id="lastNames"
              name="lastNames"
              value={formData.lastNames}
              onChange={handleChange}
              required
              placeholder="Ingresa tus apellidos"
            />
          </div>
        </div>

        <div className= "form-row">
          <div className="form-group">
            <label htmlFor="username"> Nombre de usuario </label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className= "form-row">
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>
        
        
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>
        </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              Acepto los términos y condiciones
            </label>
          </div>

          <button type="submit" className="btn-create-account">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

