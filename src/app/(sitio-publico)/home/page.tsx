import Carousel from "@/app/components/Carousel";

export default function Inicio() {
  return (
    <>
      <section className="container-fluid m-0">
        <Carousel />
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2>Ultimas fotografías</h2>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12">
            <h2>Ultimas publicaciones</h2>
          </div>
        </div>
      </section>
    </>
  );
}
