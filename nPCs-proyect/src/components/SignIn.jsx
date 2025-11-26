import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignUp.css';
import axios from 'axios';

export default function SignIn() {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {


      const userData = {
            email: formData.email,
            password: formData.password
      };

      const response = await axios.post(
          'http://localhost:5000/signIn',
          userData
      );

      const data = response.data;

      console.log('Login successful:', data);
      
      localStorage.setItem('token', data._jwt);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userEmail', formData.email);
      
      if (data.role === 'encargado de tienda') {
        navigate('/homepage-tienda'); 
      } else if (data.role === 'cliente') {
        navigate('/homepage-cliente'); 
      } else {
        navigate('/'); 
      }

    } catch (err) {

       if (err.response && err.response.status === 404) {
        setError('Usuario no encontrado. Verifica tu email.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión. Intenta nuevamente.');
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
            {error}
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
            />
          </div>

          <button 
            type="submit" 
            className="btn-create-account"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

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