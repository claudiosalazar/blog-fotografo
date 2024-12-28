"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageGallery from "@/app/components/Image-gallery";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

export default function GaleriaPaisajes() {
  const [galeria, setGaleria] = useState<GaleriaData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGaleriaPaisajes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaPaisajes`
        );
        if (response.ok) {
          const result = await response.json();
          console.log(
            "Datos de galeriaPaisajes obtenidos del backend:",
            result
          );
          setGaleria(result);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error(
            "Failed to fetch galeriaPaisajes data:",
            errorData.message
          );
        }
      } catch (error) {
        setError("Error fetching galeriaPaisajes data");
        console.error("Error fetching galeriaPaisajes data:", error);
      }
    };

    fetchGaleriaPaisajes();
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
            <span> / Paisajes</span>
          </h1>
        </div>
        <div className="mx-12">
            <ImageGallery images={galeria} />
        </div>
      </section>
    </>
  );
}

