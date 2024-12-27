import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="logo-nk">
          <Link href="/"></Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-400">Inicio</Link>
            </li>
            <li>
              <Link href="/biografia" className="hover:text-gray-400">Biografía</Link>
            </li>
            <li>
              <Link href="/galeria" className="hover:text-gray-400">Galería</Link>
            </li>
            <li>
              <Link href="/publicaciones" className="hover:text-gray-400">Publicaciones</Link>
            </li>
          </ul>
        </nav>
        <button className="btn btn-primary">Dashboard</button>
      </div>
    </header>
  );
}