import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error en búsqueda:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const getBadgeClass = (tienda) => {
        const t = tienda.toLowerCase();
        if (t.includes('kpc')) return 'badge-KPC';
        if (t.includes('kayfa')) return 'badge-Kayfa_Store';
        if (t.includes('aeon')) return 'badge-AEON';
        if (t.includes('zona')) return 'badge-Zona_Digital';
        if (t.includes('intelmax')) return 'badge-default';
        if (t.includes('xht')) return 'badge-default';
        if (t.includes('digital')) return 'badge-default';
        if (t.includes('radioshack')) return 'badge-default';
        if (t.includes('tech zone')) return 'badge-default';
        if (t.includes('acosa')) return 'badge-default';
        if (t.includes('random')) return 'badge-default';
        return 'badge-default';
    };

    return (
        <div className="container product-list-container">
            <div className="category-header">
                <h2 className="category-title">
                    Resultados para: <span className="text-highlight">"{query}"</span>
                    <small className="text-muted ms-2">({products.length} productos encontrados)</small>
                </h2>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border spinner-custom" role="status"></div>
                    <p className="mt-3">Buscando productos...</p>
                </div>
            ) : (
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
                                <div className="product-card h-100">
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
                                    <div className="card-body-custom">
                                        <h3 className="product-name" title={product.nombre}>{product.nombre}</h3>
                                        <p className="product-category">{product.categoria}</p>
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
                        !loading && (
                            <div className="col-12 text-center text-black py-5">
                                <h4>No se encontraron productos para "{query}"</h4>
                                <p className="text-muted">Intenta con otros términos de búsqueda.</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;