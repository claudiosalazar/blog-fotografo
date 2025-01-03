

import FormImgCarousel from "@/app/components/dashboard/formularios/inicio/Imgs-carousel";
import FormInfoCarousel from "@/app/components/dashboard/formularios/inicio/Info-carousel";
import React from "react";

export default function AdminInicio() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <h1>Inicio</h1>

        <FormInfoCarousel />
        <FormImgCarousel />
      </div>
    </>
  );
}
