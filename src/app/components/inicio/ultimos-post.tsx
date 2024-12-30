"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          console.log("Datos de posts obtenidos del backend:", result);
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

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleDateString("es-ES", options)
      .replace(/\//g, " / ");
  }

  function formatTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
  }

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
  };

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

      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-6">
        {posts.map((post) => (
          <div key={post.id}>
            <div className="post-inicio shadow-md rounded-lg overflow-hidden">
              <Link href={`/post/${post.id}/${formatTitle(post.tituloPost)}`}>
                <img src={getImageUrl(post.imgPost)} alt={post.alt || "Imagen de la publicación"} className="w-full h-48 object-cover" />
                <span className="block text-gray-500 text-sm mt-2">
                  {formatDate(post.fecha)}
                </span>
                <h3 className="text-lg font-semibold mt-2">
                  {post.tituloPost}
                </h3>
                <p className="text-gray-700 mt-2">{post.contenido}</p>
              </Link>
              <Link href={`/publicaciones/${post.id}/${formatTitle(post.tituloPost)}`} className="link more">
                <span className="d-block">Leer más</span>
                <span className="d-block ico-more"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-4 flex justify-center">
        <Link href="/publicaciones" className="btn primario">
          Ver mas
        </Link>
      </div>
    </>
  );
}
