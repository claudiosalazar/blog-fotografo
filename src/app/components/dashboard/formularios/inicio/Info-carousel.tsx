'use client';

import { useState, useEffect } from 'react';

export default function FormInfoCarousel() {
  const [titulo, setTitulo] = useState("");
  const [parrafo, setParrafo] = useState("");
  const [editarContenido, setEditarContenido] = useState(true);
  const [guardarContenido, setGuardarContenido] = useState(false);
  const [cancelarContenido, setCancelarContenido] = useState(false);
  const [contenidoEditable, setContenidoEditable] = useState(false);
  const [originalTitulo, setOriginalTitulo] = useState("");
  const [originalParrafo, setOriginalParrafo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const clickEditarContenido = () => {
    setOriginalTitulo(titulo);
    setOriginalParrafo(parrafo);
    setEditarContenido(false);
    setGuardarContenido(true);
    setCancelarContenido(true);
    setContenidoEditable(true);
  };

  const clickCancelar = () => {
    setTitulo(originalTitulo);
    setParrafo(originalParrafo);
    setEditarContenido(true);
    setGuardarContenido(false);
    setCancelarContenido(false);
    setContenidoEditable(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}inicio`);
        if (response.ok) {
          const result = await response.json();
          console.log('Datos obtenidos del backend:', result);
          setTitulo(result[0].titulo || '');
          setParrafo(result[0].parrafo || '');
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error('Failed to fetch data:', errorData.message);
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card mb-5">
      <h2 className="flex items-center">
        <span className="ico-tit-txt"></span>
        <span className="titulo-seccion">Información de bienvenida</span>
      </h2>

      {error && <div className="error-message">{error}</div>}

      <form>
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="titulo" className="block text-sm/6 font-medium text-gray-900">Titulo bienvenida</label>
            <div className="mt-2">
              <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={!contenidoEditable} className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="janesmith" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">Texto bienvenida</label>
            <div className="mt-2">
              <textarea name="about" id="about" value={parrafo} onChange={(e) => setParrafo(e.target.value)} disabled={!contenidoEditable} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className={`btn primario ${editarContenido ? "d-block" : "d-none"}`} onClick={clickEditarContenido}>
            Editar textos
          </button>
          <button type="button" className={`btn primario ${guardarContenido ? "d-block" : "d-none"}`}>
            Guardar
          </button>
          <button type="button" className={`btn secundario ${cancelarContenido ? "d-block" : "d-none"}`} onClick={clickCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}