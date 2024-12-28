import Carousel from "@/app/components/Carousel";
import GaleriaHome from "./ultimas-imagenes";
import UltimosPost from "./ultimos-post";

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
