'use client';

import { useState } from "react";

interface Proyecto {
  id: string;
  anoProyecto: string;
  tituloProyecto: string;
  infoProyecto: string;
}

interface ListaProyectosProps {
  proyectos: Proyecto[];
}

const ListaProyectos = ({ proyectos }: ListaProyectosProps) => {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  return (
    <div className="flex flex-col items-center md:items-start">
      <ul className={mostrarTodos ? "todo" : "inicio"}>
        {proyectos.map((proyecto: Proyecto) => (
          <li key={proyecto.id}>
            <h5>{proyecto.anoProyecto}</h5>
            <h4>{proyecto.tituloProyecto}</h4>
            <p className="txt-proyecto">{proyecto.infoProyecto}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setMostrarTodos(true)} className='btn primario btn-primario'>
        Ver más
      </button>
    </div>
  );
}

export default ListaProyectos;