import Carousel from "@/app/components/Carousel";
import GaleriaHome from "./ultimas-imagenes";
import UltimosPost from "./ultimos-post";

export default function Inicio() {
  return (
    <>
      <section className="container-fluid m-0">
        <Carousel />
      </section>

      <section className="container">
        <GaleriaHome />
      </section>

      <section className="container">
        <UltimosPost />
      </section>
    </>
  );
}
