/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ImageGalleryProps {
    images: { id: number; foto: string; alt: string }[];
}

function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        if (selectedImage) {
            // Deshabilitar el scroll en el cuerpo del documento
            document.body.style.overflow = 'hidden';
        } else {
            // Restaurar el scroll en el cuerpo del documento
            document.body.style.overflow = '';
        }

        // Restaurar el scroll en el cuerpo del documento cuando el componente se desmonte
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    const handleImageClick = (url: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        setSelectedImage(url);
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
                        <Link href="" onClick={(e) => handleImageClick(item.foto, e)} className='image-link'>
                            <span className='hover'>
                                <span>
                                    <span className='icono ico-tit-img'></span>
                                    <span className='texto'>Ver imagen</span>
                                </span>
                            </span>
                            <img src={item.foto} alt={item.alt} />
                        </Link>
                    </li>
                ))}
            </ul>

            {selectedImage && (
                <div className={`backdrop-gallery ${isClosing ? 'fade-out' : ''}`} onClick={handleCloseModal}>
                    <div className="modal-gallery mx-2 md:mx-10" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="close" onClick={handleCloseModal}>
                            <div className='icono'></div>
                        </button>
                        {/* <div className="image-container">
                            <Image src={selectedImage} alt="Selected" fill className="img-fluid image-gallery" priority={true}/>
                        </div> */}
                        <img src={selectedImage} alt="Selected" className="image-gallery-modal"/>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageGallery;