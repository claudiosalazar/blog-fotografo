"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import formatoFecha from "@/app/utility/FormatoFecha";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface PostData {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string; // Asume que es una cadena con la ruta de la imagen
  alt: string;
}

export default function UltimosPost() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}postInicio`
        );
        if (response.ok) {
          const result = await response.json();
          // console.log("Datos de posts obtenidos del backend:", result);
          setPosts(result);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error("Failed to fetch posts data:", errorData.message);
        }
      } catch (error) {
        setError("Error fetching posts data");
        console.error("Error fetching posts data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1">
        <h2>Últimas publicaciones</h2>
      </div>

      {error && (
        <div className="w-full px-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-6 mx-5 md:mx-0">
        {posts.map((post) => (
          <div key={post.id}>
            <div className="post-inicio shadow-md rounded-lg overflow-hidden">
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link-blog">
                <Image src={ImagenUrl(post.imgPost)} alt={`${post.tituloPost}`}  width={800} height={800} layout="responsive" unoptimized/>
                <span className="fecha-post">
                  {formatoFecha(post.fecha)}
                </span>
                <h3>
                  {post.tituloPost}
                </h3>
                <p className="text-gray-700 mt-2">{post.contenido}</p>
              </Link>
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link more mb-10 md:mb-0">
                <span className="d-block">Leer más</span>
                <span className="d-block ico-more"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-4 flex justify-center">
        <Link href="/blog" className="btn primario">
          Ver mas
        </Link>
      </div>
    </>
  );
}