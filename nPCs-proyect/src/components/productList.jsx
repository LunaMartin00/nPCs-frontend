import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductList.css'; 

const ProductList = () => {
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/products/${categoria}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };
    if (categoria) {
      fetchProducts();
    }
  }, [categoria]);

  // Si desean agregar otra tienda agregar aca el badge
  const getBadgeClass = (tienda) => {
    const t = tienda.toLowerCase();
    if (t.includes('kpc')) return 'badge-KPC';
    if (t.includes('kayfa')) return 'badge-Kayfa_Store';
    if (t.includes('aeon')) return 'badge-AEON';
    if (t.includes('zona')) return 'badge-Zona_Digital';
    return 'badge-default';
  };

  return (
    <div className="container product-list-container">
      {/* Encabezado de Categoría */}
      <div className="category-header">
        <h2 className="category-title">
          Explorando: <span className="text-highlight">{categoria ? categoria.toUpperCase() : '...'}</span>
        </h2>
      </div>

      {loading ? (
        <div className="loading-container">
            <div className="spinner-border spinner-custom" role="status"></div>
            <p className="mt-3">Buscando mejores precios...</p>
        </div>
      ) : (
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
                {/* Tarjeta Personalizada */}
                <div className="product-card h-100">
                  
                  {/* Imagen y Badge */}
                  <div className="card-img-wrapper">
                    <span className={`store-badge ${getBadgeClass(product.tienda)}`}>
                        {product.tienda}
                    </span>
                    <img 
                        src={product.imagen} 
                        alt={product.nombre} 
                        className="product-img" 
                    />
                  </div>

                  {/* Información */}
                  <div className="card-body-custom">
                    <h3 className="product-name" title={product.nombre}>{product.nombre}</h3>
                    <p className="product-category">{product.categoria}</p>
                    
                    {/* Precio y Botón al fondo */}
                    <div className="mt-auto">
                        <div className="price-tag">${product.precio}</div>
                        <a 
                            href={product.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-offer"
                        >
                            Ver Oferta
                        </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-black py-5">
              <h4>No se encontraron productos en esta categoría.</h4>
              <p className="text-muted">Intenta seleccionar otra categoría en el menú.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;