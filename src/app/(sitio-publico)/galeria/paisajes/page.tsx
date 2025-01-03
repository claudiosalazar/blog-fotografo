import Link from "next/link";
import ImageGallery from "@/app/components/galerias/ImageGallery";
import fetchData from "@/app/utility/fetchData";
import Title from "@/app/utility/title";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

const GaleriaPaisajes = async () => {
  let data: GaleriaData[] = [];

  try {
    data = await fetchData("galeriaPaisajes");
  } catch {
    return <div>Error al obtener los datos</div>;
  }


  return (
    <>
      <section className="galeria-seccion">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">
            <Link href="/galeria">Galeria</Link>
            <span> / Paisajes</span>
          </h1>
        </div>
        <div className="mx-6 md:mx-12">
          <ImageGallery images={data} />
        </div>
      </section>
    </>
  );
}

export default Title(GaleriaPaisajes, "Galeria Paisajes");