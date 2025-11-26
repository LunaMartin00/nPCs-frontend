import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
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
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    

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

      const response = await axios.post(
          'http://localhost:5000/signUp/cliente',
          userData
      );

      const data = response.data;

      console.log('Usuario creado:', data);
      
      alert("Usuario creado con éxito!")
       setTimeout(() => {
        navigate('/homepage-cliente');
      }, 1000);

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
      
      
      if (err.response) {
        
        const errorMessage = err.response.data.message;
        
        
        if (err.response.status === 409) {
          setError('El correo electrónico o nombre de usuario ya está registrado. Por favor, utiliza otros datos.');
        } else if (err.response.status === 400) {
          setError(errorMessage || 'Hay campos incompletos en la información');
        } else {
          setError(errorMessage || 'Error al registrar usuario');
        }
      } else if (err.request) {
        
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
       
        setError('Error inesperado al procesar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Regístrar usuario</h1>
    
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
        <div className= "form-row">
          <div className="form-group">
            <label htmlFor="firstNames">Nombres</label>
            <input
              type="text"
              id="firstNames"
              name="firstNames"
              value={formData.firstNames}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastNames">Apellidos</label>
            <input
              type="text"
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
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
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

          <button type="submit" className="btn-create-account" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>
      </div>
    </div>
  );
};