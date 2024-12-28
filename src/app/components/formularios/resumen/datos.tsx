'use client';

import { useEffect, useState } from "react";

export default function DatosResumen() {
  const [totalImagenes, setTotalImagenes] = useState(0);
  const [totalPublicaciones, setTotalPublicaciones] = useState(0);
  const [totalProyectos, setTotalProyectos] = useState(0);

  const [animatedImagenes, setAnimatedImagenes] = useState(0);
  const [animatedPublicaciones, setAnimatedPublicaciones] = useState(0);
  const [animatedProyectos, setAnimatedProyectos] = useState(0);

  useEffect(() => {
    const fetchTotalImagenes = async () => {
      try {
        const [paisajesResponse, personasResponse, animalesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaPaisajes`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaPersonas`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaAnimales`)
        ]);

        if (paisajesResponse.ok && personasResponse.ok && animalesResponse.ok) {
          const paisajesResult = await paisajesResponse.json();
          const personasResult = await personasResponse.json();
          const animalesResult = await animalesResponse.json();

          const total = paisajesResult.length + personasResult.length + animalesResult.length;
          setTotalImagenes(total);
        } else {
          console.error("Failed to fetch total imagenes");
        }
      } catch (error) {
        console.error("Error fetching total imagenes:", error);
      }
    };

    const fetchTotalPublicaciones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}post`);
        if (response.ok) {
          const result = await response.json();
          setTotalPublicaciones(result.length); // Calcula la longitud del array de resultados
        } else {
          console.error("Failed to fetch total publicaciones");
        }
      } catch (error) {
        console.error("Error fetching total publicaciones:", error);
      }
    };

    const fetchTotalProyectos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}proyectos`);
        if (response.ok) {
          const result = await response.json();
          setTotalProyectos(result.length); // Calcula la longitud del array de resultados
        } else {
          console.error("Failed to fetch total proyectos");
        }
      } catch (error) {
        console.error("Error fetching total proyectos:", error);
      }
    };

    fetchTotalImagenes();
    fetchTotalPublicaciones();
    fetchTotalProyectos();
  }, []);

  useEffect(() => {
    const easeOutQuad = (t: number) => t * (2 - t);

    const animateValue = (start: number, end: number, duration: number, setValue: (value: number) => void) => {
      const range = end - start;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const current = Math.floor(start + range * easedProgress);
        setValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    if (totalImagenes > 0) {
      animateValue(0, totalImagenes, 2000, setAnimatedImagenes);
    }
    if (totalPublicaciones > 0) {
      animateValue(0, totalPublicaciones, 2000, setAnimatedPublicaciones);
    }
    if (totalProyectos > 0) {
      animateValue(0, totalProyectos, 2000, setAnimatedProyectos);
    }
  }, [totalImagenes, totalPublicaciones, totalProyectos]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="card-datos">
        <h3>Imagenes publicadas</h3>
        <p className="fade">{animatedImagenes}</p>
      </div>
      <div className="card-datos">
        <h3>Total Publicaciones</h3>
        <p className="fade">{animatedPublicaciones}</p>
      </div>
      <div className="card-datos">
        <h3>Proyectos publicados</h3>
        <p className="fade">{animatedProyectos}</p>
      </div>
    </div>
  );
}