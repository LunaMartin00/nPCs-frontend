import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'reactstrap';
import api from '../utils/api';
import '../styles/productList.css'; // Estilos base de tarjetas
import '../styles/UserBuilds.css'; 
import DefaultPCImage from '../assets/pc-tower.svg'; // Import default image

export default function UserBuilds() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para el Modal de Specs
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [specs, setSpecs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const response = await api.get('/builds');
                setBuilds(response.data);
            } catch (error) {
                console.error("Error cargando builds:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBuilds();
    }, []);

    const handleViewSpecs = async (build) => {
        setSelectedBuild(build);
        setModalOpen(true);
        setSpecs([]); 
        try {
            const res = await api.get(`/builds/${build.id}/details`);
            setSpecs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        if(!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container builds-container">
            <div className="builds-header">
                <h2 className="builds-title">Comunidad nPCs</h2>
                <p className="builds-subtitle">Descubre las configuraciones creadas por otros usuarios.</p>
            </div>

            {loading ? (
                <div className="loading-container">
                     <div className="spinner-border spinner-custom" role="status"></div>
                </div>
            ) : (
                <div className="row">
                    {builds.map((build) => (
                        <div className="col-md-4 col-lg-3 mb-4" key={build.id}>
                            <div className="product-card h-100">
                                {/* Imagen */}
                                <div className="build-card-img-wrapper">
                                    <img 
                                        src={build.url_imagen || DefaultPCImage} 
                                        alt={build.nombre_build} 
                                        className="build-img"
                                    />
                                </div>

                                {/* Cuerpo de la tarjeta */}
                                <div className="build-info-body">
                                    <h3 className="build-name">{build.nombre_build}</h3>
                                    
                                    <div className="build-creator">
                                        <i className="fas fa-user-circle"></i> 
                                        {build.creador || 'Usuario Anónimo'}
                                    </div>

                                    <p className="build-desc">
                                        {build.descripcion}
                                    </p>

                                    <div className="build-footer">
                                        <div>
                                            <span className="build-price">${build.costo_total}</span>
                                            <div className="build-date">{formatDate(build.fecha_creacion)}</div>
                                        </div>
                                        <button 
                                            className="btn-offer" 
                                            onClick={() => handleViewSpecs(build)}
                                        >
                                            Ver Specs
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL DE SPECS (Detalles) */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} size="lg" centered>
                <div className="specs-modal-content">
                    {selectedBuild && (
                        <>
                            <h2 className="specs-title">{selectedBuild.nombre_build}</h2>
                            <p className="text-muted">{selectedBuild.descripcion}</p>
                            <hr />
                            <h5>Especificaciones:</h5>
                            
                            {specs.length === 0 ? <p>Cargando componentes...</p> : (
                                <ul className="specs-list">
                                    {specs.map((part, index) => (
                                        <li key={index} className="spec-item">
                                            <img src={part.url_imagen} alt="" className="spec-img" />
                                            <div className="spec-details">
                                                <strong>{part.categoria}:</strong> {part.nombre}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="text-end mt-3">
                                <Button color="secondary" onClick={() => setModalOpen(false)}>Cerrar</Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
