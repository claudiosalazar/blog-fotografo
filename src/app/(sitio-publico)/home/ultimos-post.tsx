'use client';

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
    <div className="row">
      <div className="col-10 ring-offset-1">
        <h2>Ultimas publicaciones</h2>
      </div>
      {error && (
        <div className="col-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {posts.map((post) => (
        <div key={post.id} className="col-10 offset-1 col-md-4 offset-md-0">
          <div className="post-inicio">
            <Link href={`/post/${post.id}/${formatTitle(post.tituloPost)}`}>
              <img
                src={getImageUrl(post.imgPost)}
                alt={post.alt || "Imagen de la publicación"}
                className="img-fluid"
              />
              <span className="fecha-post-home">{formatDate(post.fecha)}</span>
              <h3>{post.tituloPost}</h3>
              <p>{post.contenido}</p>
            </Link>
            <Link
              href={`/post/${post.id}/${formatTitle(post.tituloPost)}`}
              className="link more"
            >
              <span className="d-block">Leer más</span>
              <span className="d-block ico-more"></span>
            </Link>
          </div>
        </div>
      ))}
      <div className="col-12 d-flex justify-content-center">
        <Link href="/post" className="btn">
          Ver mas
        </Link>
      </div>
    </div>
  );
}