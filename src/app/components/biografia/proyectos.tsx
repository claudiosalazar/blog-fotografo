import Image from "next/image";
import { StaticImage } from "../../ui/Images";
import fetchData from "@/app/utility/fetchData";
import ListaProyectos from "../biografia/ListaProyectos";

interface Proyecto {
  id: string;
  anoProyecto: string;
  tituloProyecto: string;
  infoProyecto: string;
}

const Proyectos = async () => {
  let data: Proyecto[] = [];

  try {
    data = await fetchData("proyectos");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  const proyectosIniciales = data.slice(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 proyectos">
      <div className="w-full flex justify-center ">
        <Image src={StaticImage.camera2} alt={StaticImage?.camera2} width={1920} height={1200} unoptimized className="camera hidden md:block"/>
      </div>

      <div className="md:w-9/12 mx-5 md:mx-0">
        <h2 className="tit-bio">Proyectos</h2>
        <ListaProyectos proyectos={proyectosIniciales} />
      </div>
    </div>
  );
}

export default Proyectos;