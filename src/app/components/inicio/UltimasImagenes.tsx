import Link from "next/link";
import Image from "next/image";
import fetchData from "@/app/utility/fetchData";
// // import getImagenUrl from "@/app/utility/UseImagenUrl";
import ImagenUrlProduction from "@/app/utility/ImagenUrlProduction";

interface GaleriaData {
  id: string;
  album: string;
  foto: string;
  alt: string;
}

const GaleriaHome = async () => {
  let galeria: GaleriaData[] = [];

  try {
    galeria = await fetchData("galeria");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  return (
    <div className="row">
      <div className="column-10 px-4">
        <h2>Ultimas fotografías</h2>
      </div>

      <div className="gallery mx-5 md:mx-0">
        {galeria.slice(0, 6).map((item, index) => {
          let additionalClass = "";
          if (index === 0) {
            additionalClass = "inicio";
          } else if (index === 2) {
            additionalClass = "medio";
          } else if (index === 4) {
            additionalClass = "final";
          }

          return (
            <div
              key={index}
              className={`image ${
                index === 0
                  ? "vertical"
                  : index === 1 || index === 2
                  ? "big"
                  : index === 3
                  ? "medio"
                  : index === 4
                  ? "horizontal"
                  : index === 5
                  ? "small"
                  : ""
              }`}
            >
              <Image src={ImagenUrlProduction(item.foto)} alt={item.alt} width={800} height={800} unoptimized className={`lazy-image ${additionalClass}`} />
            </div>
          );
        })}
      </div>

      <div className="w-full px-4 flex justify-center">
        <Link href="/galeria" className="btn primario">
          Ir a galeria
        </Link>
      </div>
    </div>
  );
}

export default GaleriaHome;