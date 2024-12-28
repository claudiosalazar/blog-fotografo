'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/panel-de-administracion/resumen", label: "Resumen" },
  { href: "/panel-de-administracion/inicio/", label: "Inicio" },
  { href: "/panel-de-administracion/biografia/", label: "Biografia" },
  { href: "/panel-de-administracion/galeria/", label: "Galeria" },
  { href: "/panel-de-administracion/publicaciones/", label: "Publicaciones" },
  { href: "/", label: "Salir" },
];

const normalizePath = (path: string) => {
  // Asegura que la URL no termine con una barra, excepto si es solo "/"
  const trimmedPath = path === "/dashboard/" ? path : path.replace(/\/$/, "");
  // Retorna la URL en minúsculas
  return trimmedPath.toLowerCase();
};

function MenuDashboard() {
  const pathname = usePathname();

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="menu w-2/12 pt-8">
      <div className="logo-nk"></div>

      <ul>
        {links.map((link) => (
          <li key={link.label}>
            {link.href === "/" ? (
              <Link className={`${normalizePath(pathname) === normalizePath(link.href) ? "active" : ""}`} href={link.href} onClick={handleLogoutClick}>
                {link.label}
              </Link>
            ) : (
              <Link className={`${normalizePath(pathname) === normalizePath(link.href) ? "active" : ""}`} href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDashboard;