import Image from "next/image";
import TextoBienvenida from "./texto-bienvenida";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface CarouselData {
  id: string;
  imgCarousel: string;
}

const Carousel = async () => {
  const url = "http://localhost:3001/carousel"; // Define la URL directamente aquí
  const response = await fetch(url);
  const data: CarouselData[] = await response.json();

  if (!response.ok) {
    return (
      <div className="carousel">
        <p className="text-red-500">Failed to fetch carousel data</p>
      </div>
    );
  }

  if (!data || data.length < 3) {
    return (
      <div className="carousel">
        <p className="text-red-500">Not enough data to display the carousel</p>
      </div>
    );
  }

  const [firstImage, secondImage, thirdImage] = data;

  let img1 = true;
  let img2 = false;
  let img3 = false;

  const changeImages = () => {
    setTimeout(() => {
      img1 = false;
      img2 = true;
      img3 = false;
      setTimeout(() => {
        img1 = false;
        img2 = false;
        img3 = true;
        setTimeout(() => {
          img1 = true;
          img2 = false;
          img3 = false;
          changeImages(); // Llama a la función de nuevo para crear un bucle infinito
        }, 300);
      }, 300);
    }, 300);
  };

  changeImages(); // Inicia el ciclo de cambio de imágenes

  return (
    <div className="carousel relative">
      <TextoBienvenida />
      <div className="carousel-contenido">
        <div className="carousel-item">
          {img1 && <Image src={ImagenUrl(firstImage.imgCarousel)} alt="Carousel image 1" width={1920} height={1080} unoptimized />}
        </div>
        <div className="carousel-item">
          {!img2 && <Image src={ImagenUrl(secondImage.imgCarousel)} alt="Carousel image 2" width={1920} height={1080} unoptimized />}
        </div>
        <div className="carousel-item">
          {!img3 && <Image src={ImagenUrl(thirdImage.imgCarousel)} alt="Carousel image 3" width={1920} height={1080} unoptimized />}
        </div>
      </div>
    </div>
  );
};

export default Carousel;