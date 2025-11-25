import React, { useState } from 'react';
import '../styles/ArmarPC.css';

import PlacaMadre from '../assets/motherboard.svg';
import CPU from '../assets/Cpu.svg';
import TarjetaGrafica from '../assets/video-card.svg';
import MemoriaRamImg from '../assets/ram-memory.svg';
import FuenteAlim from '../assets/power_supply.svg';
import DiscoDuro from '../assets/hard-drive.svg';
import Servidor from '../assets/pc-tower.svg';

const categories = [
    { slug: 'procesadores', name: 'Procesador', icon: CPU },
    { slug: 'placas-madre', name: 'Placa Madre', icon: PlacaMadre },
    { slug: 'memorias-ram', name: 'Memoria RAM', icon: MemoriaRamImg },
    { slug: 'tarjetas-de-video', name: 'Tarjeta de Video', icon: TarjetaGrafica },
    { slug: 'almacenamiento', name: 'Almacenamiento', icon: DiscoDuro },
    { slug: 'fuentes-poder', name: 'Fuente de Poder', icon: FuenteAlim },
    { slug: 'cases', name: 'Case', icon: Servidor },
];

const ArmarPC = () => {
    const [build, setBuild] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = (category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
        fetchProducts(category.slug);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProducts([]);
        setCurrentCategory(null);
    };

    const fetchProducts = async (slug) => {
        setLoading(true);
        try {
            const response = await fetch('');
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

    const addComponent = (product) => {
        setBuild({ ...build, [currentCategory.slug]: product });
        closeModal();
    };

    const removeComponent = (slug) => {
        const newBuild = { ...build };
        delete newBuild[slug];
        setBuild(newBuild);
    };

    const calculateTotal = () => {
        return Object.values(build).reduce((total, item) => {
            const price = parseFloat(item.precio) || 0; 
            return total + price;
        }, 0);
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
                                    <button className="btn-remove" onClick={() => removeComponent(cat.slug)}>
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                <div className="builder-total-row">
                    <div className="total-label">Total Estimado:</div>
                    <div className="total-amount">${calculateTotal().toFixed(2)}</div>
                </div>
            </div>

            {/* modal para la seleccion de productos */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Seleccionar {currentCategory?.name}</h3>
                            <button className="btn-close" onClick={closeModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {loading ? (
                                <div className="loading-spinner">Cargando...</div>
                            ) : (
                                <div className="product-list-mini">
                                    {products.length > 0 ? (
                                        products.map(p => (
                                            <div key={p.id} className="product-item-mini">
                                                <img src={p.imagen} alt={p.nombre} />
                                                <div className="p-info">
                                                    <h4>{p.nombre}</h4>
                                                    <p>${p.precio}</p>
                                                </div>
                                                <button className="btn-select" onClick={() => addComponent(p)}>
                                                    Añadir
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay productos disponibles.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArmarPC;
