"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageGallery from "@/app/components/Image-gallery";
import Title from "@/app/utility/title";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

const GaleriaAnimales = () => {
  const [galeria, setGaleria] = useState<GaleriaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGaleriaAnimales = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaAnimales`
        );
        if (response.ok) {
          const result = await response.json();
          console.log(
            "Datos de galeriaAnimales obtenidos del backend:",
            result
          );
          setGaleria(result);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error(
            "Failed to fetch galeriaAnimales data:",
            errorData.message
          );
        }
      } catch (error) {
        setError("Error fetching galeriaAnimales data");
        console.error("Error fetching galeriaAnimales data:", error);
      }
    };

    fetchGaleriaAnimales();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (galeria.length === 0) {
    return null;
  }

  return (
    <>
      <section className="galeria-seccion">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">
            <Link href="/galeria">Galeria</Link>
            <span> / Animales</span>
          </h1>
        </div>
        <div className="mx-6 md:mx-12">
            <ImageGallery images={galeria} />
        </div>
      </section>
    </>
  );
}

export default Title(GaleriaAnimales);