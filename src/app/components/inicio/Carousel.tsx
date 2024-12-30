'use client';

import { useState, useEffect } from "react";
import TextoBienvenida from "./texto-bienvenida";

interface CarouselData {
  imgCarousel1: string;
  imgCarousel2: string;
  imgCarousel3: string;
}

export default function Carousel() {
  const [carousel, setCarousel] = useState<CarouselData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}carousel`);
        if (response.ok) {
          const result = await response.json();
          // console.log("Datos obtenidos del backend:", result);
          setCarousel(result[0]); // Asegúrate de que el resultado sea un objeto con las propiedades imgCarousel1, imgCarousel2, imgCarousel3
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
  }, []);

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return '';
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (imgPath.startsWith('http')) {
        return imgPath;
    }
    return `${backendUrl.replace(/\/$/, '')}/${imgPath.replace(/^\//, '')}`;
  };

  if (error) {
    return <div className="carousel"><p className="text-red-500">{error}</p></div>;
  }

  if (!carousel) {
    return <div className="carousel"><p>Loading...</p></div>;
  }

  const slides = [
    { id: 1, image: getImageUrl(carousel.imgCarousel1) },
    { id: 2, image: getImageUrl(carousel.imgCarousel2) },
    { id: 3, image: getImageUrl(carousel.imgCarousel3) },
  ];

  return (
    <div className="carousel">
      <TextoBienvenida />
      <div className="relative overflow-hidden carousel-contenido">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${ index === currentSlide ? "opacity-100" : "opacity-0" }`}>
            <div className="relative w-full h-full">
              <img src={slide.image} className="img-fluid" alt={`Slide ${slide.id}`} />
            </div>
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 ms-4" onClick={prevSlide} >
        <div className="ico-anterior-carousel d-block"></div>
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 me-4" onClick={nextSlide} >
        <div className="ico-siguiente-carousel d-block"></div>
      </button>
    </div>
  );
}