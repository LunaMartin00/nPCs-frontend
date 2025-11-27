import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp.css';
import axios from 'axios';

export default function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password
      };

      console.log('Enviando datos de login:', userData);

      const response = await axios.post(
        'http://localhost:5000/signIn',
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      const data = response.data;

      console.log('Login successful:', data);
      

      localStorage.setItem('token', data._jwt || data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userEmail', formData.email);
      
      
      if (onLogin && typeof onLogin === 'function') {
        console.log('Llamando onLogin con:', { role: data.role, email: formData.email });
        onLogin(data.role, formData.email);
      } else {
        console.warn('onLogin no está disponible o no es una función');
      }
      
      
      console.log('Redirigiendo según rol:', data.role);
      if (data.role === 'encargado de tienda') {
        navigate('/homepage-tienda', { replace: true }); 
      } else if (data.role === 'cliente') {
        navigate('/homepage-cliente', { replace: true }); 
      } else {
        navigate('/', { replace: true }); 
      }

    } catch (err) {

      console.error('Error completo en login:', err);
      
      
      if (err.response) {
      
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;
        
        switch (status) {
          case 400:
            setError('Datos de entrada inválidos');
            break;
          case 401:
            setError('Credenciales incorrectas');
            break;
          case 404:
            setError('Usuario no encontrado. Verifica tu email.');
            break;
          case 409:
            setError('Conflicto con la cuenta');
            break;
          case 500:
            setError('Error del servidor. Intenta más tarde.');
            break;
          default:
            setError(message || `Error ${status}: Intenta nuevamente.`);
        }
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Tiempo de espera agotado. Intenta nuevamente.');
      } else {
        setError('Error inesperado. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Iniciar Sesión</h1>

          {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              disabled={loading}
              className={error ? 'error-field' : ''}
            />
          </div>

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
              disabled={loading}
              className={error ? 'error-field' : ''}
            />
          </div>


          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-create-account"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div className="signin-links">
            <Link to="/register" className="no-account-link">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}