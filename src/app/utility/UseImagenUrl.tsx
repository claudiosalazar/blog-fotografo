import ImagenUrl from './ImagenUrl';
import ImagenUrlProduction from './ImagenUrlProduction';

const getImagenUrl = process.env.NODE_ENV === 'production' ? ImagenUrlProduction : ImagenUrl;

export default getImagenUrl;