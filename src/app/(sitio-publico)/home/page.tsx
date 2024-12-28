import Carousel from "@/app/components/inicio/Carousel";
import GaleriaHome from "../../components/inicio/ultimas-imagenes";
import UltimosPost from "../../components/inicio/ultimos-post";

export default function Inicio() {
  return (
    <>
      <main className="relative mx-auto">
        <div className="container p-0">
          <Carousel />
        </div>

        <section className="container inicio">
          <GaleriaHome />
        </section>

        <section className="container inicio">
          <UltimosPost />
        </section>
      </main>
    </>
  );
}
