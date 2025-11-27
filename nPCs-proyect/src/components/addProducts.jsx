// components/AddProductForm.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/addProducts.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function AddProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    launchDate: '',
    productUrl: '',
    imageUrl: '',
    storeId: '',
    quantity: '',
    storePrice: ''
  });

  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar categorías y tiendas al iniciar
  useEffect(() => {
    const fetchCategoriesAndStores = async () => {
      try {
        // En una implementación real, estos vendrían de tu API
        // Por ahora los ponemos estáticos basados en tu BD
        setCategories([
          { id: 1, name: 'procesadores' },
          { id: 2, name: 'tarjetas-graficas' },
          { id: 3, name: 'placas-madre' },
          { id: 4, name: 'fuentes-poder' },
          { id: 5, name: 'memorias-ram' },
          { id: 6, name: 'almacenamiento' },
          { id: 7, name: 'gabinetes' }
        ]);

        setStores([
          { id: 1, nombre_tienda: 'KPC Hardware' },
          { id: 2, nombre_tienda: 'Kayfa Store' },
          { id: 3, nombre_tienda: 'AEON' },
          { id: 4, nombre_tienda: 'Zona Digital' },
          { id: 5, nombre_tienda: 'Intelmax' },
          { id: 6, nombre_tienda: 'XHT' },
          { id: 7, nombre_tienda: 'Digital Solutions' },
          { id: 8, nombre_tienda: 'RadioShack' },
          { id: 9, nombre_tienda: 'Tech Zone' },
          { id: 10, nombre_tienda: 'ACOSA' },
          { id: 11, nombre_tienda: 'Random Computer' }
        ]);

      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar categorías y tiendas');
      }
    };

    fetchCategoriesAndStores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (!formData.productName || !formData.price || !formData.category || 
        !formData.productUrl || !formData.imageUrl || !formData.storeId || 
        !formData.quantity || !formData.storePrice) {
      setError('Todos los campos marcados con * son obligatorios');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.price) <= 0 || parseFloat(formData.storePrice) <= 0) {
      setError('Los precios deben ser mayores a 0');
      setLoading(false);
      return;
    }

    if (parseInt(formData.quantity) < 0) {
      setError('La cantidad no puede ser negativa');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        nombre: formData.productName,
        precio: parseFloat(formData.price),
        fecha_de_lanzamiento: formData.launchDate || null,
        id_categoria: parseInt(formData.category),
        url: formData.productUrl,
        url_imagen: formData.imageUrl,
        id_tienda: parseInt(formData.storeId),
        cantidad_disponible: parseInt(formData.quantity),
        precio_de_tienda: parseFloat(formData.storePrice)
      };

      const response = await axios.post(
        'http://localhost:5000/addProducts',
        productData
      );

      console.log('Producto creado:', response.data);
      
      setSuccess(`¡Producto "${response.data.productName}" agregado exitosamente!`);

      // Limpiar formulario
      setFormData({
        productName: '',
        price: '',
        category: '',
        launchDate: '',
        productUrl: '',
        imageUrl: '',
        storeId: '',
        quantity: '',
        storePrice: ''
      });

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/explorar/todos');
      }, 3000);

    } catch (err) {
      console.error('Error al agregar producto:', err);
      
      if (err.response) {
        const errorMessage = err.response.data.message;
        
        if (err.response.status === 409) {
          setError('Este producto ya existe en la tienda seleccionada');
        } else if (err.response.status === 400) {
          setError(errorMessage || 'Hay campos incompletos o inválidos en la información');
        } else {
          setError(errorMessage || 'Error al agregar producto');
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
    <div className="add-product-container">
      <div className="add-product-card">
        <h1>Agregar Nuevo Producto</h1>
        <p className="form-subtitle">Completa todos los campos para agregar un producto al sistema</p>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-section">
            <h3>Información Básica del Producto</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Nombre del Producto *</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  placeholder="Ej: AMD Ryzen 5 5600X"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Precio Base ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Categoría *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="launchDate">Fecha de Lanzamiento</label>
                <input
                  type="date"
                  id="launchDate"
                  name="launchDate"
                  value={formData.launchDate}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Enlaces y Multimedia</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="productUrl">URL del Producto *</label>
                <input
                  type="url"
                  id="productUrl"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://tienda.com/producto"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="imageUrl">URL de la Imagen *</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://tienda.com/imagen.jpg"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Información de Inventario y Precio</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="storeId">Tienda *</label>
                <select
                  id="storeId"
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una tienda</option>
                  {stores.map(store => (
                    <option key={store.id} value={store.id}>
                      {store.nombre_tienda}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Cantidad Disponible *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="storePrice">Precio en Tienda ($) *</label>
                <input
                  type="number"
                  id="storePrice"
                  name="storePrice"
                  value={formData.storePrice}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-add-product" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Agregando Producto...
              </>
            ) : (
              'Agregar Producto'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}