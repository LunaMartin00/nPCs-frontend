import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/ArmarPC.css';

import CPU from '../assets/Cpu.svg'; 
import MotherboardIcon from '../assets/motherboard.svg';
import RAMIcon from '../assets/ram-memory.svg';
import GPUIcon from '../assets/video-card.svg';
import StorageIcon from '../assets/hard-drive.svg';
import PSUIcon from '../assets/power_supply.svg';
import CaseIcon from '../assets/pc-tower.svg';

const categories = [
    { slug: 'CPU', name: 'CPU', icon: CPU },
    { slug: 'placas-madre', name: 'Placa Madre', icon: MotherboardIcon },
    { slug: 'memorias-ram', name: 'Memoria RAM', icon: RAMIcon },
    { slug: 'tarjetas-de-video', name: 'Tarjeta de Video', icon: GPUIcon },
    { slug: 'almacenamiento', name: 'Almacenamiento', icon: StorageIcon },
    { slug: 'fuentes-poder', name: 'Fuente de Poder', icon: PSUIcon },
    { slug: 'case', name: 'Case', icon: CaseIcon },
];

const ArmarPC = () => {
    const navigate = useNavigate();
    
    // Estados
    const [build, setBuild] = useState({});
    const [products, setProducts] = useState([]);
    
    // Estados de UI
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estado Formulario
    const [publishData, setPublishData] = useState({
        name: '',
        description: '',
        imageUrl: ''
    });

    //FUNCIONES
    
    const openModal = async (category) => {
        setCurrentCategory(category);
        setIsProductModalOpen(true);
        setLoading(true);
        try {
            const response = await api.get(`/products/${category.slug}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error cargando productos", error);
        } finally {
            setLoading(false);
        }
    };

    const addComponent = (product) => {
        setBuild({ ...build, [currentCategory.slug]: product });
        setIsProductModalOpen(false);
    };

    const removeComponent = (slug) => {
        const newBuild = { ...build };
        delete newBuild[slug];
        setBuild(newBuild);
    };

    const calculateTotal = () => {
        return Object.values(build).reduce((total, item) => {
            return total + (parseFloat(item.precio) || 0);
        }, 0);
    };

    // PUBLICAR
    const handleClickPublish = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            if(window.confirm("Debes iniciar sesión para publicar. ¿Ir al login?")) {
                navigate('/signin');
            }
            return;
        }

        const components = Object.values(build);
        if (components.length === 0) {
            alert("Agrega al menos un componente.");
            return;
        }

        setPublishData({
            name: '',
            description: '',
            imageUrl: ''
        });

        setIsPublishModalOpen(true);
    };

    const submitPublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        const components = Object.values(build);
        const productIds = components.map(p => p.id);

        // Si el usuario no puso imagen, usamos la del gabinete o el primer componente
        let finalImageUrl = publishData.imageUrl;
        if (!finalImageUrl) {
            finalImageUrl = build['case'] ? build['case'].imagen : (components.length > 0 ? components[0].imagen : '');
        }

        try {
            await api.post('/builds', {
                nombre_build: publishData.name,
                descripcion: publishData.description,
                costo_total: calculateTotal(),
                url_imagen: finalImageUrl,
                productos: productIds
            });
            alert("¡Publicado!");
            navigate('/builds');
        } catch (error) {
            console.error(error);
            alert("Error al publicar.");
        } finally {
            setLoading(false);
            setIsPublishModalOpen(false);
        }
    };

    return (
        <div className="armar-container">
            <header className="armar-header">
                <h2>Arma tu PC</h2>
                <p>Selecciona los componentes para tu nueva computadora.</p>
            </header>

            <div className="builder-table">
                <div className="builder-header-row">
                    <div className="col-component">Componente</div>
                    <div className="col-selection">Selección</div>
                    <div className="col-price">Precio</div>
                    <div className="col-action"></div>
                </div>
                
                {/* Filas de componentes */}
                {categories.map((cat) => {
                    const selectedItem = build[cat.slug];
                    return (
                        <div key={cat.slug} className="builder-row">
                            <div className="col-component">
                                <img src={cat.icon} alt="" className="category-icon-small" />
                                <span className="category-name">{cat.name}</span>
                            </div>
                            <div className="col-selection">
                                {selectedItem ? (
                                    <div className="selected-item">
                                        <img src={selectedItem.imagen} alt={selectedItem.nombre} className="item-thumb" />
                                        <div className="item-details">
                                            <span className="item-name">{selectedItem.nombre}</span>
                                            <span className="item-shop">Tienda: {selectedItem.tienda}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="btn-add-component" onClick={() => openModal(cat)}>
                                        + Elegir {cat.name}
                                    </button>
                                )}
                            </div>
                            <div className="col-price">
                                {selectedItem ? `$${selectedItem.precio}` : '-'}
                            </div>
                            <div className="col-action">
                                {selectedItem && (
                                    <button className="btn-remove" onClick={() => removeComponent(cat.slug)}>✕</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            { /*total y publicar */ }
            <div className="publish-section">
                <div className="total-display">Total: ${calculateTotal().toFixed(2)}</div>
                <button className="btn-publish" onClick={handleClickPublish}>
                    <i className="fas fa-cloud-upload-alt"></i> Publicar Build
                </button>
            </div>

            {/* MODAL PRODUCTOS */}
            {isProductModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Seleccionar {currentCategory?.name}</h3>
                            <button className="btn-close" onClick={() => setIsProductModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            {loading ? <div className="loading-spinner">Cargando...</div> : (
                                <div className="product-list-mini">
                                    {products.map(p => (
                                        <div key={p.id} className="product-item-mini">
                                            <img src={p.imagen} alt={p.nombre} />
                                            <div className="p-info">
                                                <h4>{p.nombre}</h4>
                                                <p>${p.precio}</p>
                                            </div>
                                            <button className="btn-select" onClick={() => addComponent(p)}>Añadir</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL PUBLICAR */}
            {isPublishModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content modal-publish">
                        <div className="modal-header">
                            <h3>Publicar mi Build</h3>
                            <button className="btn-close" onClick={() => setIsPublishModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitPublish} className="publish-form">
                                <div className="form-group">
                                    <label>Nombre de la Build</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        required 
                                        placeholder="Ej: La Bestia Gamer"
                                        value={publishData.name}
                                        onChange={e => setPublishData({...publishData, name: e.target.value})}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea 
                                        className="form-control"
                                        rows="3"
                                        placeholder="Descripción corta..."
                                        value={publishData.description}
                                        onChange={e => setPublishData({...publishData, description: e.target.value})}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>URL Imagen (Opcional)</label>
                                    <input 
                                        type="url" 
                                        className="form-control"
                                        placeholder="https://..."
                                        value={publishData.imageUrl}
                                        onChange={e => setPublishData({...publishData, imageUrl: e.target.value})}
                                    />
                                    <small className="form-help-text">Si vacío, usaremos la foto de tus componentes.</small>
                                </div>

                                {publishData.imageUrl && (
                                    <div className="img-preview">
                                        <img src={publishData.imageUrl} alt="Preview" className="img-preview-content" />
                                    </div>
                                )}

                                <button type="submit" className="btn-confirm-publish" disabled={loading}>
                                    {loading ? 'Publicando...' : 'Confirmar y Publicar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArmarPC;
