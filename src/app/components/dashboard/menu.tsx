'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const normalizePath = (path: string) => {
  // Asegura que la URL no termine con una barra, excepto si es solo "/"
  const trimmedPath = path === "/dashboard/" ? path : path.replace(/\/$/, "");
  // Retorna la URL en minúsculas
  return trimmedPath.toLowerCase();
};

function MenuDashboard() {
  const pathname = usePathname();
  const [activePosition, setActivePosition] = useState(0);
  const resumenRef = useRef<HTMLAnchorElement>(null);
  const inicioRef = useRef<HTMLAnchorElement>(null);
  const biografiaRef = useRef<HTMLAnchorElement>(null);
  const galeriaRef = useRef<HTMLAnchorElement>(null);
  const publicacionesRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const positions: { [key: string]: number } = {
      "/panel-de-administracion/resumen": resumenRef.current?.offsetTop || 0,
      "/panel-de-administracion/inicio": inicioRef.current?.offsetTop || 0,
      "/panel-de-administracion/biografia": biografiaRef.current?.offsetTop || 0,
      "/panel-de-administracion/galeria": galeriaRef.current?.offsetTop || 0,
      "/panel-de-administracion/publicaciones": publicacionesRef.current?.offsetTop || 0,
    };

    const normalizedPath = normalizePath(pathname);
    if (normalizedPath in positions) {
      setActivePosition(positions[normalizedPath]);
    } else {
      setActivePosition(0);
    }
  }, [pathname]);

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="menu-dashboard w-2/12 pt-8 relative">
      <div className="logo-nk"></div>

      <div className="contenedor-menu relative">
        <Link ref={resumenRef} className={normalizePath(pathname) === normalizePath("/panel-de-administracion/resumen") ? "active" : ""} href="/panel-de-administracion/resumen">
          Resumen
        </Link>
        <Link ref={inicioRef} className={normalizePath(pathname) === normalizePath("/panel-de-administracion/inicio/") ? "active" : ""} href="/panel-de-administracion/inicio/">
          Inicio
        </Link>
        <Link ref={biografiaRef} className={normalizePath(pathname) === normalizePath("/panel-de-administracion/biografia/") ? "active" : ""} href="/panel-de-administracion/biografia/">
          Biografia
        </Link>
        <Link ref={galeriaRef} className={normalizePath(pathname) === normalizePath("/panel-de-administracion/galeria/") ? "active" : ""} href="/panel-de-administracion/galeria/">
          Galeria
        </Link>
        <Link ref={publicacionesRef} className={normalizePath(pathname) === normalizePath("/panel-de-administracion/publicaciones") ? "active" : ""} href="/panel-de-administracion/publicaciones">
          Publicaciones
        </Link>
        <div className="bg-active" style={{ transform: `translateY(${activePosition}px)`, transition: "transform 0.3s ease" }}></div>
      </div>

      <Link className={normalizePath(pathname) === normalizePath("/") ? "active" : ""} href="/" onClick={handleLogoutClick}>
        Salir
      </Link>
    </div>
  );
}

export default MenuDashboard;