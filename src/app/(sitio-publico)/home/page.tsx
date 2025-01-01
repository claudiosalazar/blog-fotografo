import Carousel from "@/app/components/inicio/Carousel";
import GaleriaHome from "../../components/inicio/ultimas-imagenes";
import UltimosPost from "../../components/inicio/ultimos-post";
import Title from "@/app/utility/title";

const Inicio = async () => {
  return (
    <>
      <div className="container p-0">
        {/* <Carousel /> */}
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