import Proyectos from "@/app/components/biografia/ContenidoProyectos";
import SobreMi from "@/app/components/biografia/SobreMi";
import Title from "@/app/utility/title";
import Link from "next/link";
import Image from "next/image";
// import getImagenUrl from "@/app/utility/UseImagenUrl";
import ImagenUrl from "@/app/utility/ImagenUrl";
import fetchData from "@/app/utility/fetchData";

interface ImgBio {
  imgBio: string;
}

const Biografia = async () => {
  let data: ImgBio[] = [];

  try {
    data = await fetchData("imagenBiografia");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  const imgBio = data[0];

  return (
    <>
      <section className="vitrina-bio">
        <div className="row">
          <div className="">
            <div className="texto-bio">
              <h1 className="pb-10 md:pb-0">Biografía</h1>
              <div className="flex flex-col md:flex-row">
                <div className="logo-bio"></div>
                <div className="nombre-bio flex flex-col">
                  <div className="presentacion">Mi nombre es</div>
                  <div className="nombre">Nikonlas Canons</div>
                </div>
              </div>
            </div>
            {imgBio && (
              <Image src={ImagenUrl(imgBio.imgBio.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, ""))} alt="Biografía" width={1200} height={800} unoptimized/>
            )}
          </div>
        </div>
      </section>

      <section className="sobre-mi">
        <SobreMi />
      </section>

      <hr className="my-10 md:my-24" />

      <section className="container proyectos">
        <Proyectos />
      </section>

      <hr className="mb-10 mt-16 md:my-24" />

      <section className="container hablemos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-5 md:mx-0">
          <div className="md:w-full flex justify-start">
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

          <div className="md:w-9/12">
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

export default Title(Biografia, "Biografía");