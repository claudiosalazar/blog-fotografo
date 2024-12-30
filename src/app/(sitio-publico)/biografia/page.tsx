/* eslint-disable @next/next/no-img-element */

"use client";

import Proyectos from "@/app/components/biografia/proyectos";
import SobreMi from "@/app/components/biografia/sobre-mi";
import Title from "@/app/utility/title";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ImgBio {
  imgBio: string;
}

const Biografia = () => {
  const [imgBio, setImgBio] = useState<ImgBio | null>(null);

  useEffect(() => {
    const fetchImgBio = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}imagenBiografia`
        );
        if (response.ok) {
          const result = await response.json();
          setImgBio(result[0]);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch data:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImgBio();
  }, []);

  return (
    <>
      <section className="vitrina-bio">
        <div className="row">
          <div className="">
            <div className="texto-bio">
              <h1>Biografía</h1>
              <div className="flex flex-row">
                <div className="logo-bio"></div>
                <div className="nombre-bio flex flex-col">
                  <div className="presentacion">Mi nombre es</div>
                  <div className="nombre">Nikonlas Canons</div>
                </div>
              </div>
            </div>
            <img src={imgBio?.imgBio} className="img-fluid" alt="Biografía" />
          </div>
        </div>
      </section>

      <section className="container sobre-mi">
        <SobreMi />
      </section>

      <hr className="mb-24" />

      <section className="container proyectos">
        <Proyectos />
      </section>

      <hr className="my-24" />

      <section className="container hablemos">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full flex justify-start">
            <ul>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-fb"></div>
                  <span>facebook/nikolascanons</span>
                </Link>
              </li>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-ins"></div>
                  <span>@nikolascanons</span>
                </Link>
              </li>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-lk"></div>
                  <span>linkedin.com/in/nikolascanons</span>
                </Link>
              </li>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-x"></div>
                  <span>@nikolascanons</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-9/12">
            <ul>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-mail"></div>
                  <span>hablemos@nikolascanons.com</span>
                </Link>
              </li>
              <li>
                <Link href="#" target="blank" className="link flex">
                  <div className="icono ico-phone"></div>
                  <span>+569 5555 5555</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Title(Biografia);