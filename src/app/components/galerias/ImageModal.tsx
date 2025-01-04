'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  selectedImage: string | null;
  alt: string;
  isClosing: boolean;
  handleCloseModal: () => void;
}

const ImageModal = ({ selectedImage, alt, isClosing, handleCloseModal }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleCloseModal]);

  if (!selectedImage) return null;

  return (
    <div className={`backdrop-gallery ${isClosing ? 'fade-out' : ''}`} onClick={handleCloseModal}>
      <div className="modal-gallery mx-10" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" onClick={handleCloseModal}>
          <div className='icono'></div>
        </button>
        <div className="image-gallery-modal">
          <Image src={selectedImage} alt={alt} width={1920} height={1200} unoptimized className="image-gallery"  />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;