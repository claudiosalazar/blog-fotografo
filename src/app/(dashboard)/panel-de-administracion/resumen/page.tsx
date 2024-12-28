import DatosResumen from "@/app/components/dashboard/formularios/resumen/datos";
import NuevasImagenes from "@/app/components/dashboard/formularios/resumen/nuevas-imagenes";
import NuevasPublicaciones from "@/app/components/dashboard/formularios/resumen/nuevas-publicaciones";
import Link from "next/link";

export default function Resumen() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-auto">
          <h1>Hola Nikolas,</h1>
          <span className="bajada-saludo d-block">bienvenido nuevamente.</span>
          <div className="mt-3 d-block">
            <p>Tu último ingreso fue el</p>
            <p><strong>00 / 00 / 0000</strong></p>
          </div>
        </div>
        <div className="card mt-3 mb-2 h-auto">
          <h2 className="resumen-pregunta text-center">¿Qué deseas hacer hoy?</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/panel-de-administracion/galeria" className="btn primario-resumen">
              Subir nuevas fotografías
            </Link>
            <Link href="/panel-de-administracion/publicaciones" className="btn primario-resumen">
              Publicar nuevo articulo
            </Link>
          </div>
        </div>
      </div>

      <DatosResumen />
      <NuevasImagenes />
      <NuevasPublicaciones />
    </>
  );
}
