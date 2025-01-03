import React from 'react';
import fetchData from "@/app/utility/fetchData";

interface Bio {
  infoBio: string;
}

const SobreMi = async () => {
  let data: Bio[] = [];

  try {
    data = await fetchData("biografia");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  const bio = data[0];

  return (
    <div className="grid grid-cols-1">
      <div className="mx-8 md:mx-32">
        <h2 className='tit-bio'>Sobre mi</h2>
        <p>{bio.infoBio}</p>
      </div>
    </div>
  );
};

export default SobreMi;