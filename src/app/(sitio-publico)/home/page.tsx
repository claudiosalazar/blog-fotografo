import Carousel from "@/app/components/inicio/Carousel";
import Title from "@/app/utility/title";
import GaleriaHome from "@/app/components/inicio/UltimasImagenes";
import UltimosPost from "@/app/components/inicio/UltimosPost";

const Inicio = async () => {
  return (
    <>
      <div className="container p-0">
        <Carousel />
      </div>

      <section className="container inicio">
        <GaleriaHome />
      </section>

      <section className="container inicio">
        <UltimosPost />
      </section>
    </>
  );
}

export default Title(Inicio, 'Inicio');