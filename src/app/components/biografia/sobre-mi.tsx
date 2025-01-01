'use client';

import { useEffect, useState } from 'react';

interface Bio {
  infoBio: string;
}

export default function SobreMi() {
  const [bio, setBio] = useState<Bio | null>(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}biografia`);
        if (response.ok) {
          const result = await response.json();
          // console.log('Datos obtenidos del backend:', result);
          setBio(result[0]);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch data:', errorData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchBio();
  }, []);


  return (
    <div className="grid grid-cols-1">
      <div className="mx-8 md:mx-32">
        <h2 className='tit-bio'>Sobre mi</h2>
        <p>{bio?.infoBio}</p>
      </div>
    </div>
  );
}
