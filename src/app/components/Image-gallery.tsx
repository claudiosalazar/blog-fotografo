import { useState } from 'react';
import Link from 'next/link';

interface ImageGalleryProps {
    images: { id: number; foto: string; alt: string }[];
}

function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleImageClick = (url: string) => {
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
            <ul className="grid grid-cols-1 gap-0 md:grid-cols-4">
                {images.map((item) => (
                    <li key={item.id}>
                        <Link href="#" onClick={() => handleImageClick(item.foto)} className='image-link'>
                            <span className='hover'>
                                <span>
                                    <span className='icono ico-tit-img'></span>
                                    <span className='texto'>Ver imagen</span>
                                </span>
                            </span>
                            <div className="position-relative" style={{ width: '100%', height: '100%' }}>
                                <img src={item.foto} alt={item.alt} className="img-fluid" style={{objectFit:"cover"}} />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {selectedImage && (
                <div className={`backdrop-gallery ${isClosing ? 'fade-out' : ''}`} onClick={handleCloseModal}>
                    <div className="modal-gallery mx-10" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="close" onClick={handleCloseModal}>
                            <div className='icono'></div>
                        </button>
                        {/* <div className="image-container">
                            <Image src={selectedImage} alt="Selected" fill className="img-fluid image-gallery" priority={true}/>
                        </div> */}
                        <img src={selectedImage} alt="Selected" className="img-fluid image-gallery"/>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageGallery;