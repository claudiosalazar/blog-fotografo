'use client';

import { useState, useEffect } from 'react';
import { StaticImage } from '../ui/Images';

const slides = [
  { id: 1, content: 'Slide 1', image: StaticImage.ejemplo },
  { id: 2, content: 'Slide 2', image: StaticImage.ejemplo },
  { id: 3, content: 'Slide 3', image: StaticImage.ejemplo },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="carousel">
      <div className="relative overflow-hidden carousel-contenido">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full"> {/* Añadido relative, w-full y h-full para el contenedor de la imagen */}
              <img src={slide.image} alt={slide.content} className='' />
            </div>
            <div className="p-4 bg-gray-200">{slide.content}</div>
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2" onClick={prevSlide}>
        <div className='ico-anterior-carousel d-block'></div>
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2" onClick={nextSlide}>
        <div className='ico-siguiente-carousel d-block'></div>
      </button>
    </div>
  );
}