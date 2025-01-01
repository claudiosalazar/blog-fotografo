import Link from 'next/link';
import Image from 'next/image';

interface ImageGalleryProps {
    images: { id: number; foto: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (
        <>
            <ul className="grid grid-cols-2 gap-0 md:grid-cols-4 ">
                {images.map((item) => (
                    <li key={item.id}>
                        <Link href={item.foto} className='image-link'>
                            <span className='hover'>
                                <span>
                                    <span className='icono ico-tit-img'></span>
                                    <span className='texto'>Ver imagen</span>
                                </span>
                            </span>
                            <Image src={item.foto} alt={item.alt} width={800} height={800} priority={true} />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ImageGallery;