import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <small className='flex-column flex-md-row d-flex align-items-center'>
        <span className='d-block'>
          Nikonlas Canons © 2024 - V.1 
        </span>
        <span className='d-none d-md-block'>- </span>
        <span className='d-block'>
          Desarrollo por <Link href='https://www.claudiosalazar.cl' className="link" target='_blank' rel='noopener noreferrer'>Claudio Salazar</Link>
        </span>
      </small>
      <ul>
        <li>
          <Link href="#" className="ico-fb"></Link>
        </li>
        <li>
          <Link href="#" className="ico-ins"></Link>
        </li>
        <li>
          <Link href="#" className="ico-lk"></Link>
        </li>
        <li>
          <Link href="#" className="ico-x"></Link>
        </li>
      </ul>
    </footer>
  );
}