// import Image from 'next/image';

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   className?: string;
//   priority?: boolean;
//   sizes?: string;
// }

// const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, className = 'size-auto', priority = true, sizes = 'auto' }) => {
//   return (
//     <Image
//       src={src}
//       alt={alt}
//       fill
//       className={`${className}`}
//       priority={priority}
//       sizes={sizes}
//       // style={{ objectFit: 'cover' }}
//       unoptimized
//     />
//   );
// };

const StaticImage = {
  ejemplo: '/images/ejemplo-carousel.jpg',
  camera1: '/images/bg-camera-1.png',
  camera2: '/images/camera-1.png',
  gPaisajes: '/images/g-paisajes.jpg',
  gPersonas: '/images/g-personas.jpg',
  gAnimales: '/images/g-animales.jpg',
  noImage: '/images/no-image.jpg',
};

// export { ImageComponent, StaticImage };
export { StaticImage };