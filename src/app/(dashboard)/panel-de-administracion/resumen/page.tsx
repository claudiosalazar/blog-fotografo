import DatosResumen from "@/app/components/formularios/resumen/datos";
import NuevasImagenes from "@/app/components/formularios/resumen/nuevas-imagenes";
import NuevasPublicaciones from "@/app/components/formularios/resumen/nuevas-publicaciones";

export default function Resumen() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-auto">
          <h1>Hola Nikolas,</h1>
          <span>bienvenido nuevamente.</span>
          <p>Tu último ingreso fue el</p>
          <p>00 / 00 / 0000</p>
        </div>
        <div className="card mt-3 mb-2 h-auto">asad</div>
      </div>

      <DatosResumen />

      <NuevasImagenes />

      <NuevasPublicaciones />
    </>
  );
}
