import React from "react";
import fetchData from "@/app/utility/fetchData";

interface BienvenidaData {
  titulo: string;
  parrafo: string;
}

const TextoBienvenida = async () => {
  let data: BienvenidaData[] = [];

  try {
    data = await fetchData("inicio");
  } catch {
    return <div>Error al obtener los datos</div>;
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