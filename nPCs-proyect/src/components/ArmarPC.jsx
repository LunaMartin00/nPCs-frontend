import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArmarPC.css';

import PlacaMadre from '../assets/placa-madre.png';
import TorreCPU from '../assets/torre-de-la-cpu.png';
import TarjetaGrafica from '../assets/tarjeta-grafica.png';
import MemoriaRamImg from '../assets/memoria-ram.png';
import FuenteAlim from '../assets/fuente-de-alimentacion.png';
import DiscoDuro from '../assets/disco-duro.png';
import Servidor from '../assets/servidor.png';

const categories = [
    { slug: 'placas-madre', name: 'Placas Madre', desc: 'Placas bases' },
    { slug: 'tarjetas-graficas', name: 'Tarjetas Gráficas', desc: 'Las mejores tarjetas graficas que puedas encontrar' },
    { slug: 'procesadores', name: 'Procesadores (CPU)', desc: 'Procesadores de alto rendimiento' },
    { slug: 'memorias-ram', name: 'Memoria RAM', desc: 'Las mejores memorias RAM para tu PC' },
    { slug: 'almacenamiento', name: 'Almacenamiento', desc: 'Lo que buscas para guardar tus datos' },
    { slug: 'fuentes-poder', name: 'Fuentes de Poder', desc: 'De lo ultimo en el mercado' },
    { slug: 'gabinetes', name: 'Gabinetes', desc: 'De alta calidad y diseño' },
];

const ArmarPC = () => {
    const icons = {
        'placas-madre': PlacaMadre,
        'tarjetas-graficas': TarjetaGrafica,
        'procesadores': TorreCPU,
        'memorias-ram': MemoriaRamImg,
        'almacenamiento': DiscoDuro,
        'fuentes-poder': FuenteAlim,
        'gabinetes': Servidor,
    };
    return (
        <div className="armar-container">
            <header className="armar-header">
                <h2>Armar PC</h2>
                <p>Selecciona una categoría para ver los productos disponibles.</p>
            </header>

            <div className="categories-grid">
                {categories.map((c) => (
                    <Link key={c.slug} to={`/explorar/${c.slug}`} className="category-card">
                        <div className="category-icon">
                            <img src={icons[c.slug] || PlacaMadre} alt={c.name} className="category-image" />
                        </div>
                        <div className="category-body">
                            <h3>{c.name}</h3>
                            <p className="muted">{c.desc}</p>
                            <span className="explore-link">Ver productos →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ArmarPC;
