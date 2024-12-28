'use client';

import { StaticImage } from "../../ui/Images";
import { useEffect, useState } from 'react';

interface Proyecto {
  id: string;
  anoProyecto: string;
  tituloProyecto: string;
  infoProyecto: string;
}

export default function Proyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [visibleProyectos, setVisibleProyectos] = useState<number>(3);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}proyectos`);
        if (response.ok) {
          const result = await response.json();
          console.log('Datos obtenidos del backend:', result);
          setProyectos(result);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch data:', errorData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProyectos();
  }, []);

  const handleShowMore = () => {
    setVisibleProyectos(proyectos.length); // Mostrar todos los proyectos
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full flex justify-center">
        <img src={StaticImage.camera2} alt="conocimientos" className="camera" />
      </div>

      <div className="w-9/12">
        <h2 className="tit-bio">Proyectos</h2>
        {proyectos.slice(0, visibleProyectos).map((proyecto) => (
          <div key={proyecto.id}>
            <h5>{proyecto.anoProyecto}</h5>
            <h4>{proyecto.tituloProyecto}</h4>
            <p className="txt-proyecto">{proyecto.infoProyecto}</p>
          </div>
        ))}
        {visibleProyectos < proyectos.length && (
          <button className='mt-5 btn primario' onClick={handleShowMore}>
            Ver más
          </button>
        )}
      </div>
    </div>
  );
}