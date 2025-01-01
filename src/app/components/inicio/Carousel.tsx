/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from "react";
import TextoBienvenida from "./texto-bienvenida";

interface CarouselData {
  id: string;
  imgCarousel: string;
}

export default function Carousel() {
  const [carousel, setCarousel] = useState<CarouselData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === (carousel?.length || 1) - 1 ? 0 : prev + 1));
  }, [carousel]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? (carousel?.length || 1) - 1 : prev - 1));
  }, [carousel]);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await fetch("http://localhost:3001/carousel"); // Define la URL directamente aquí
        if (response.ok) {
          const result = await response.json();
          setCarousel(result); // Asegúrate de que el resultado sea un array de objetos con las propiedades id y imgCarousel
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error("Failed to fetch data:", errorData.message);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchCarousel();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [carousel, nextSlide]);

  if (error) {
    return <div className="carousel"><p className="text-red-500">{error}</p></div>;
  }

  if (!carousel) {
    return <div className="carousel"><p>Loading...</p></div>;
  }

  return (
    <div className="carousel">
      <TextoBienvenida />
      <div className="relative overflow-hidden carousel-contenido">
        {carousel.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${ index === currentSlide ? "opacity-100" : "opacity-0" }`}>
            <div className="relative w-full h-full">
              <img src={slide.imgCarousel} className="img-fluid" alt={`Slide ${slide.id}`} />
            </div>
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 ms-4 hidden md:block" onClick={prevSlide} >
        <div className="ico-anterior-carousel d-block"></div>
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 me-4 hidden md:block" onClick={nextSlide} >
        <div className="ico-siguiente-carousel d-block"></div>
      </button>
    </div>
  );
}
import { useCallback } from "react";
