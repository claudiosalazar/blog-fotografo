import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container-fluid mx-auto flex justify-between items-center p-4 m-0">
        <div className="logo-nk">
          <Link href="/"></Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/biografia">Biografía</Link>
            </li>
            <li>
              <Link href="/galeria">Galería</Link>
            </li>
            <li>
              <Link href="/publicaciones">Publicaciones</Link>
            </li>
          </ul>
        </nav>
        <Link href="panel-de-administracion" className="btn dashboard-header">Dashboard</Link>
      </div>
    </header>
  );
}