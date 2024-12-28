"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../../../Loading";

interface PostData {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string; // Asume que es una cadena con la ruta de la imagen
  alt: string;
}

export default function NuevasPublicaciones() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Eliminar todos los archivos CSS cargados en el navegador
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((sheet) => {
        if ((sheet as HTMLLinkElement).href.includes("dashboard/layout.css")) {
          sheet.remove();
        }
      });

      // Asegurarse de que globals.scss esté cargado
      const globalStyle = document.querySelector('link[rel="stylesheet"]');
      if (!globalStyle) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/layout.css";
        document.head.appendChild(link);
      }

      // Redirigir al path '/' y recargar la página
      router.push("/");
    } else {
      fetchPosts();
    }
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/post");
      if (response.ok) {
        const result = await response.json();
        console.log("Datos de posts obtenidos del backend:", result);
        setPosts(result || []);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch posts data:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  };

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <div className="grid grid-cols-1 card">
        <h2 className="flex items-center">
          <span className="ico-tit-txt"></span>
          <span className="titulo-seccion">Últimas publicaciones</span>
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="h-fit">
              <div className="card-post-resumen">
                <div className="contenedor-imagenes-dashboard card-img-top">
                  {!imagesLoaded[post.id] && <Loading isLoading={true} onLoaded={() => {}} />}
                  <img src={post.imgPost ? `${BASE_URL}${post.imgPost}` : ""} alt={post.alt || "Imagen de la publicación"} className={`card-img-top ${!imagesLoaded[post.id] ? 'hidden' : ''}`} onLoad={() => handleImageLoad(post.id)} />
                </div>
                <div className="card-body">
                  <small>Publicado el {post.fecha}</small>
                  <h5 className="resumen-post">{post.tituloPost}</h5>
                  <p>{post.contenido}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end botonera">
          <Link href="/panel-de-administracion/publicaciones" className="btn primario dashboard">
            Ver todas las publicaciones
          </Link>
        </div>
      </div>
    </>
  );
}