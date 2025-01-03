import TextoBienvenida from "./TextoBienvenida";
import fetchData from "@/app/utility/fetchData";
import ImagenesCarousel from "./ImagenesCarousel";

interface CarouselData {
  id: string;
  imgCarousel: string;
}

export default async function Carousel() {
  let initialData: CarouselData[] = [];

  try {
    initialData = await fetchData("carousel");
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="carousel"><p className="text-red-500">Error al obtener los datos</p></div>;
  }

  return (
    <div className="carousel">
      <TextoBienvenida />
      <ImagenesCarousel initialData={initialData} />
    </div>
  );
}