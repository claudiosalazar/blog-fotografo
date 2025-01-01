import Link from "next/link";
import ImageGallery from "@/app/components/Image-gallery";
import Title from "@/app/utility/title";

interface GaleriaData {
  id: number;
  album: string;
  foto: string;
  alt: string;
}

const GaleriaPersonas = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}galeriaPersonas`;
  const response = await fetch(url);
  const galeria: GaleriaData[] = await response.json();

  if (!response.ok) {
    return <div>Error: Failed to fetch galeriaPersonas data</div>;
  }

  if (galeria.length === 0) {
    return null;
  }

  return (
    <>
      <section className="galeria-seccion">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">
            <Link href="/galeria">Galeria</Link>
            <span> / Personas</span>
          </h1>
        </div>
        <div className="mx-6 md:mx-12">
          <ImageGallery images={galeria} />
        </div>
      </section>
    </>
  );
}

export default Title(GaleriaPersonas, "Galeria Personas");