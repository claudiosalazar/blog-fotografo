import Link from "next/link";
import Image from "next/image";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

const GaleriaHome = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://blog-fotografo.claudiosalazar.cl/";
  const url = `${BASE_URL}galeria`;
  let galeria: GaleriaData[] = [];

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch galeria data");
    }

    galeria = await response.json();
  } catch (error) {
    console.error("Error fetching galeria data:", error);
    return (
      <div className="row">
        <div className="column-10 px-4">
          <h2>Ultimas fotografías</h2>
          <p className="text-red-500">Failed to fetch galeria data</p>
        </div>
      </div>
    );
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
              <Image src={ImagenUrl(item.foto)} alt={`${item.alt}`} width={800} height={800} unoptimized className={`lazy-image ${additionalClass}`} />
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