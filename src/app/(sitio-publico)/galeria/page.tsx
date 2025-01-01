"use client";

import Link from "next/link";
import Image from "next/image";
import { StaticImage } from "../../ui/Images";
import Title from "@/app/utility/title";

const Galeria = () => {
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
                <Image src={StaticImage.gPaisajes} alt={StaticImage?.gPaisajes || "default image"} width={1920} height={1200}  priority={true} />
              </Link>
            </li>
            <li className="btn-galeria">
              <Link href="/galeria/personas" className="link-galeria-inicio">
                <span>Personas</span>
                <Image src={StaticImage.gPersonas} alt={StaticImage?.gPersonas || "default image"} width={1920} height={1200}  priority={true} />
              </Link>
            </li>
            <li className="btn-galeria">
              <Link href="/galeria/animales" className="link-galeria-inicio">
                <span>Animales</span>
                <Image src={StaticImage.gAnimales} alt={StaticImage?.gAnimales || "default image"} width={1920} height={1200}  priority={true} />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Title(Galeria);