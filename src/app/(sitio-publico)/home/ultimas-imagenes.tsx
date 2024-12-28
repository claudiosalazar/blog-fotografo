"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import throttle from "lodash.throttle";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

export default function GaleriaHome() {
  const [galeria, setGaleria] = useState<GaleriaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGaleria = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}galeria`
        );
        if (response.ok) {
          const result = await response.json();
          console.log("Datos de galeria obtenidos del backend:", result);
          setGaleria(result);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error("Failed to fetch galeria data:", errorData.message);
        }
      } catch (error) {
        setError("Error fetching galeria data");
        console.error("Error fetching galeria data:", error);
      }
    };

    fetchGaleria();
  }, []);

  useEffect(() => {
    const lazyImages = Array.from(document.querySelectorAll('.lazy-image')) as HTMLImageElement[];
    const inAdvance = 300;

    function lazyLoad() {
        lazyImages.forEach(image => {
            if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) {
                console.log('Cargando imagen:', image.dataset.src);
                image.src = image.dataset.src || '';
                image.onload = () => image.classList.add('loaded');
            }
        });

        // Remove event listeners if all images are loaded
        if (lazyImages.every(image => image.classList.contains('loaded'))) {
            window.removeEventListener('scroll', throttledLazyLoad);
            window.removeEventListener('resize', throttledLazyLoad);
        }
    }

    const throttledLazyLoad = throttle(lazyLoad, 16);

    lazyLoad();
    window.addEventListener('scroll', throttledLazyLoad);
    window.addEventListener('resize', throttledLazyLoad);

    return () => {
        window.removeEventListener('scroll', throttledLazyLoad);
        window.removeEventListener('resize', throttledLazyLoad);
    };
  }, []);

  return (
    <div className="row">
      <div className="column-10 px-4">
        <h2>Ultimas fotografías</h2>
      </div>

      {error && (
        <div className="col-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="gallery">
        {galeria.slice(0, 6).map((item, index) => {
          let additionalClass = "";
          if (index === 0) {
            additionalClass = "inicio";
          } else if (index === 2) {
            additionalClass = "medio";
          } else if (index === 4) {
            additionalClass = "final";
          }

          return (
            <div
              key={index}
              className={`image ${
                index === 0
                  ? "vertical"
                  : index === 1 || index === 2
                  ? "big"
                  : index === 3
                  ? "medio"
                  : index === 4
                  ? "horizontal"
                  : index === 5
                  ? "small"
                  : ""
              }`}
            >
              <img className={`lazy-image ${additionalClass}`} src={item.foto} alt={item.alt} ></img>
            </div>
          );
        })}
      </div>

      <div className="w-full px-4 flex justify-center">
        <Link href="/galeria" className="btn primario">
          Ir a galeria
        </Link>
      </div>
    </div>
  );
}