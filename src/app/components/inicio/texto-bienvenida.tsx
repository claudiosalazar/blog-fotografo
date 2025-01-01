import React from "react";

interface BienvenidaData {
  titulo: string;
  parrafo: string;
}

const TextoBienvenida = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}inicio`;
  const response = await fetch(url);
  const data: BienvenidaData[] = await response.json();

  if (!response.ok) {
    return (
      <div className="texto-bienvenida">
        <p className="text-red-500">Failed to fetch data</p>
      </div>
    );
  }

  const bienvenida = data[0];

  return (
    <div className="texto-bienvenida">
      <h1>{bienvenida.titulo}</h1>
      <p>{bienvenida.parrafo}</p>
    </div>
  );
};

export default TextoBienvenida;