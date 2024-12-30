"use client";

import { useEffect, useState } from "react";

interface BienvenidaData {
  titulo: string;
  parrafo: string;
}

export default function TextoBienvenida() {
  const [data, setInfo] = useState<BienvenidaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}inicio`
        );
        if (response.ok) {
          const result = await response.json();
          // console.log("Datos obtenidos del backend:", result);
          setInfo(result[0]);
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

    fetchInfo();
  }, []);

  if (error) {
    return (
      <div className="texto-bienvenida">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="texto-bienvenida">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="texto-bienvenida">
      <h1>{data.titulo}</h1>
      <p>{data.parrafo}</p>
    </div>
  );
}
