'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImagenUrlProduction from "@/app/utility/ImagenUrlProduction";
import ImageModal from './ImageModal';

interface ImageGalleryClientProps {
  images: { id: number; foto: string; alt: string }[];
}

const ImageGalleryClient = ({ images }: ImageGalleryClientProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [altText, setAltText] = useState<string>('');

  const handleImageClick = (url: string, alt: string) => {
    setSelectedImage(url);
    setAltText(alt);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 800);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-0 md:grid-cols-4 ">
        {images.map((item) => (
          <li key={item.id}>
            <Link href="#" onClick={() => handleImageClick(ImagenUrlProduction(item.foto), item.alt)} className='image-link'>
              <span className='hover'>
                <span>
                  <span className='icono ico-tit-img'></span>
                  <span className='texto'>Ver imagen</span>
                </span>
              </span>
              <Image src={ImagenUrlProduction(item.foto)} alt={item.alt} width={800} height={800} unoptimized/>
            </Link>
          </li>
        ))}
      </ul>

      <ImageModal
        selectedImage={selectedImage}
        alt={altText}
        isClosing={isClosing}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ImageGalleryClient;