import ImageClient from './ImageClient';

interface ImageGalleryProps {
  images: { id: number; foto: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return <ImageClient images={images} />;
}

export default ImageGallery;