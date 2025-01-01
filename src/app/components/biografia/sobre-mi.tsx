import React from 'react';

interface Bio {
  infoBio: string;
}

const SobreMi = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}biografia`;
  const response = await fetch(url);
  const data: Bio[] = await response.json();

  if (!response.ok) {
    return (
      <div className="grid grid-cols-1">
        <div className="mx-8 md:mx-32">
          <h2 className='tit-bio'>Sobre mi</h2>
          <p className="text-red-500">Failed to fetch data</p>
        </div>
      </div>
    );
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