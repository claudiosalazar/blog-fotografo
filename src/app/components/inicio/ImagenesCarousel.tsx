'use client';

import { useState, useEffect, useCallback } from "react";
import getImagenUrl from "@/app/utility/UseImagenUrl";
import Image from "next/image";

interface CarouselData {
  id: string;
  imgCarousel: string;
}

interface ImagenesCarouselProps {
  initialData: CarouselData[];
}

export default function ImagenesCarousel({ initialData }: ImagenesCarouselProps) {
  const [carousel] = useState<CarouselData[]>(initialData);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === (carousel.length || 1) - 1 ? 0 : prev + 1));
  }, [carousel]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? (carousel.length || 1) - 1 : prev - 1));
  }, [carousel]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [carousel, nextSlide]);

  return (
    <div className="relative overflow-hidden carousel-contenido">
      {carousel.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${ index === currentSlide ? "opacity-100" : "opacity-0" }`}>
          <div className="relative w-full h-full">
            <Image src={getImagenUrl(slide.imgCarousel)} className="img-fluid" alt={`Slide ${slide.id}`} width={1920} height={1080} unoptimized />
          </div>
        </div>
      ))}
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 ms-4 hidden md:block" onClick={prevSlide} >
        <div className="ico-anterior-carousel d-block"></div>
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 me-4 hidden md:block" onClick={nextSlide} >
        <div className="ico-siguiente-carousel d-block"></div>
      </button>
    </div>
  );
}