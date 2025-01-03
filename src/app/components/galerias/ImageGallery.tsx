import Link from 'next/link';
import Image from 'next/image';
import ImagenUrl from '@/app/utility/ImagenUrl';

interface ImageGalleryProps {
    images: { id: number; foto: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (
        <>
            <ul className="grid grid-cols-2 gap-0 md:grid-cols-4 ">
                {images.map((item) => (
                    <li key={item.id}>
                        <Link href={ImagenUrl(item.foto)} className='image-link'>
                            <span className='hover'>
                                <span>
                                    <span className='icono ico-tit-img'></span>
                                    <span className='texto'>Ver imagen</span>
                                </span>
                            </span>
                            <Image src={ImagenUrl(item.foto)} alt={item.alt} width={800} height={800} unoptimized />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ImageGallery;