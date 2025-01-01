import Image from "next/image";
import TextoBienvenida from "./texto-bienvenida";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface CarouselData {
  id: string;
  imgCarousel: string;
  alt: string;
}

const Carousel = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}carousel`;
  const response = await fetch(url);
  const data: CarouselData[] = await response.json();

  return (
    <div className="carousel">
      <TextoBienvenida />
      <div className="relative overflow-hidden carousel-contenido">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={ImagenUrl(item.imgCarousel)}
                alt={item.alt || `Carousel image ${index}`}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;