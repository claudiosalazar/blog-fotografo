"use client";

import Link from "next/link";
import { StaticImage } from "../../ui/Images";

export default function Galeria() {
  return (
    <>
      <section className="galeria-secciones">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">Galeria</h1>
        </div>
        <div className="grid grid-cols-1 gap-1 mx-12 ">
          <ul className="d-flex flex-wrap justify-content-center">
            <li className="btn-galeria">
              <Link href="/galeria/paisajes" className="link-galeria-inicio">
                <span>Paisajes</span>
                <img
                  src={StaticImage.gPaisajes}
                  alt="paisajes"
                  className="paisajes"
                />
              </Link>
            </li>
            <li className="btn-galeria">
              <Link href="/galeria/personas" className="link-galeria-inicio">
                <span>Personas</span>
                <img src={StaticImage.gPersonas} alt="personas" />
              </Link>
            </li>
            <li className="btn-galeria">
              <Link href="/galeria/animales" className="link-galeria-inicio">
                <span>Animales</span>
                <img
                  src={StaticImage.gAnimales}
                  alt="animales"
                  className="animales"
                />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
