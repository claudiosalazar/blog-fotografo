"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../../Loading";

interface AlbumPaisajes {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

interface AlbumPersonas {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

interface AlbumAnimales {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

const NuevasImagenes = () => {
  const [paisajes, setPaisajes] = useState<AlbumPaisajes[]>([]);
  const [personas, setPersonas] = useState<AlbumPersonas[]>([]);
  const [animales, setAnimales] = useState<AlbumAnimales[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchGaleriaPaisajes = async () => {
      try {
        const response = await fetch("http://localhost:3001/galeriaPaisajes");
        if (response.ok) {
          const result = await response.json();
          setPaisajes(result.slice(0, 4)); // Limita a 4 elementos
        } else {
          const errorData = await response.json();
          console.error(
            "Error fetching galeriaPaisajes data:",
            errorData.message
          );
        }
      } catch (error) {
        console.error("Error fetching galeriaPaisajes data:", error);
      }
    };

    const fetchGaleriaPersonas = async () => {
      try {
        const response = await fetch("http://localhost:3001/galeriaPersonas");
        if (response.ok) {
          const result = await response.json();
          setPersonas(result.slice(0, 4)); // Limita a 4 elementos
        } else {
          const errorData = await response.json();
          console.error(
            "Error fetching galeriaPersonas data:",
            errorData.message
          );
        }
      } catch (error) {
        console.error("Error fetching galeriaPersonas data:", error);
      }
    };

    const fetchGaleriaAnimales = async () => {
      try {
        const response = await fetch("http://localhost:3001/galeriaAnimales");
        if (response.ok) {
          const result = await response.json();
          setAnimales(result.slice(0, 4)); // Limita a 4 elementos
        } else {
          const errorData = await response.json();
          console.error(
            "Error fetching galeriaAnimales data:",
            errorData.message
          );
        }
      } catch (error) {
        console.error("Error fetching galeriaAnimales data:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchGaleriaPaisajes(),
        fetchGaleriaPersonas(),
        fetchGaleriaAnimales(),
      ]);
    };

    fetchData();
  }, []);

  const handleImageLoad = (id: number) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <div className="grid grid-cols-1 card relative">
        <h2 className="flex items-center">
          <span className="ico-tit-gallery"></span>
          <span className="titulo-seccion">Últimas imágenes publicadas</span>
        </h2>
        <div className="card gris mb-5">
            <h3>
              <span>Album Paisajes</span>
              <span>|</span>
              <Link href="#">Ver album</Link>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {paisajes.map((item) => (
                <div key={item.id} className="relative contenedor-imagenes-dashboard formato-1">
                  {!imagesLoaded[item.id] && <Loading isLoading={true} onLoaded={() => {}} />}
                  <img
                    src={item.foto}
                    className={`rounded-md formato-1 ${!imagesLoaded[item.id] ? 'hidden' : ''}`}
                    alt={item.alt}
                    onLoad={() => handleImageLoad(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card gris mb-5">
            <h3>
              <span>Album Personas</span>
              <span>|</span>
              <Link href="#">Ver album</Link>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {personas.map((item) => (
                <div key={item.id} className="relative contenedor-imagenes-dashboard formato-1">
                  {!imagesLoaded[item.id] && <Loading isLoading={true} onLoaded={() => {}} />}
                  <img
                    src={item.foto}
                    className={`rounded-md formato-1 ${!imagesLoaded[item.id] ? 'hidden' : ''}`}
                    alt={item.alt}
                    onLoad={() => handleImageLoad(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card gris">
            <h3>
              <span>Album Animales</span>
              <span>|</span>
              <Link href="#">Ver album</Link>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {animales.map((item) => (
                <div key={item.id} className="relative contenedor-imagenes-dashboard formato-1">
                  {!imagesLoaded[item.id] && <Loading isLoading={true} onLoaded={() => {}} />}
                  <img
                    src={item.foto}
                    className={`rounded-md formato-1 ${!imagesLoaded[item.id] ? 'hidden' : ''}`}
                    alt={item.alt}
                    onLoad={() => handleImageLoad(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end botonera">
            <Link href="/galeria" className="btn primario dashboard">
              Ver todas las imágenes
            </Link>
          </div>
      </div>
    </>
  );
};

export default NuevasImagenes;