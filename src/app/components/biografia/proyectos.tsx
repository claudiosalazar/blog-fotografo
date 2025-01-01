import Link from "next/link";
import Image from "next/image";
import { StaticImage } from "../../ui/Images";

interface Proyecto {
  id: string;
  anoProyecto: string;
  tituloProyecto: string;
  infoProyecto: string;
}

const Proyectos = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}proyectos`;
  const response = await fetch(url);
  const proyectos: Proyecto[] = await response.json();

  if (!response.ok) {
    return (
      <div className="grid grid-cols-1">
        <div className="mx-8 md:mx-32">
          <h2 className='tit-bio'>Proyectos</h2>
          <p className="text-red-500">Failed to fetch data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full flex justify-center ">
        <Image src={StaticImage.camera2} alt={StaticImage?.camera2} width={1920} height={1200} priority={true} className="camera hidden md:block"/>
      </div>

      <div className="md:w-9/12 mx-5 md:mx-0">
        <h2 className="tit-bio">Proyectos</h2>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id}>
            <h5>{proyecto.anoProyecto}</h5>
            <h4>{proyecto.tituloProyecto}</h4>
            <p className="txt-proyecto">{proyecto.infoProyecto}</p>
          </div>
        ))}
        <Link href="proyectos" className='btn primario'>
          Ver mas
        </Link>
      </div>
    </div>
  );
}

export default Proyectos;