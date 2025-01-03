import Image from "next/image";
import TextoBienvenida from "./texto-bienvenida";
import fetchData from "@/app/utility/fetchData";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface CarouselData {
  id: string;
  imgCarousel: string;
}

const Carousel = async () => {
  let imagenes: CarouselData[] = [];

  try {
    imagenes = await fetchData("carousel");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  const [firstImage, secondImage, thirdImage] = imagenes;

  // let img1 = true;
  // let img2 = false;
  // let img3 = false;

  // const changeImages = () => {
  //   setTimeout(() => {
  //     img1 = false;
  //     img2 = true;
  //     img3 = false;
  //     setTimeout(() => {
  //       img1 = false;
  //       img2 = false;
  //       img3 = true;
  //       setTimeout(() => {
  //         img1 = true;
  //         img2 = false;
  //         img3 = false;
  //         changeImages();
  //       }, 300);
  //     }, 300);
  //   }, 300);
  // };

  // changeImages();

  return (
    <div className="carousel relative">
      <TextoBienvenida />
      <div className="carousel-contenido">
        <div className="carousel-item">
          <Image src={ImagenUrl(firstImage.imgCarousel)} alt="Carousel image 1" width={1920} height={1080} unoptimized />
        </div>
        <div className="carousel-item">
          <Image src={ImagenUrl(secondImage.imgCarousel)} alt="Carousel image 2" width={1920} height={1080} unoptimized />
        </div>
        <div className="carousel-item">
          <Image src={ImagenUrl(thirdImage.imgCarousel)} alt="Carousel image 3" width={1920} height={1080} unoptimized />
        </div>
      </div>
    </div>
  );
};

export default Carousel;