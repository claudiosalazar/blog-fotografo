"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface PostData {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string | null; // Asegúrate de que imgPost sea una cadena de texto
  alt: string;
}

export default function PostDetalle() {
  const [post, setPost] = useState<PostData | null>(null);
  const [prevPost, setPrevPost] = useState<PostData | null>(null);
  const [nextPost, setNextPost] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const fetchPost = async (postId: number) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}post/${postId}`
        );
        if (response.ok) {
          const result = await response.json();
          return result;
        } else if (response.status === 404) {
          return null;
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error("Failed to fetch post data:", errorData.message);
          return null;
        }
      } catch (error) {
        setError("Error fetching post data");
        console.error("Error fetching post data:", error);
        return null;
      }
    };

    const fetchData = async () => {
      const currentPost = await fetchPost(Number(id));
      setPost(currentPost);

      if (currentPost) {
        const prevPost = await fetchPost(currentPost.id - 1);
        setPrevPost(prevPost);

        const nextPost = await fetchPost(currentPost.id + 1);
        setNextPost(nextPost);
      }
    };

    fetchData();
  }, [id]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Cargando...</div>;
  }

  // Verifica que prevPost y nextPost tengan imgPost y una ruta válida
  const prevPostImg = prevPost ? `${BASE_URL}${prevPost.imgPost || ""}` : "";
  const nextPostImg = nextPost ? `${BASE_URL}${nextPost.imgPost || ""}` : "";

  return (
    <>
      <section className="post-detalle w-4/5">
        <div className="grid grid-cols-1">
          <div className="post-header">
            <Link href="/publicaciones" className="post-header-volver">
              <div className="icono"></div>
            </Link>
            <div className="post-header-datos">
              <small>{formatDate(post.fecha)}</small>
              <h2>{post.tituloPost}</h2>
              <Link href="#" className="link more">
                <span className="d-block">Compartir</span>
                <span className="d-block ico-share"></span>
              </Link>
            </div>
            <div className="post-header-image">
              <img src={post.imgPost ? `${BASE_URL}${post.imgPost}` : ""} alt={post.alt || "Imagen de la publicación"} />
            </div>
          </div>
          <div className="post-body">
            {post?.contenido.split(".").map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}.</p>
            ))}
          </div>

          <hr className="d-none d-md-block mb-20" />

          <div className="post-nav">
            <div className="flex justify-between">
              {prevPost ? (
                <div className="post-anterior">
                  <Link href={`/publicaciones/${prevPost.id}/${formatTitle( prevPost.tituloPost )}`} className="link" >
                    <div className="flex flex-row">
                    <img src={prevPostImg} />
                      <div className="info-post-siguiente">
                        <span className="ico-anterior mb-2"></span>
                        <span className="fecha-post-anterior">
                          {formatDate(prevPost.fecha)}
                        </span>
                        <p className="d-block">{prevPost.tituloPost}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="post-anterior"></div>
              )}
              {nextPost ? (
                <div className="post-siguiente">
                  <Link href={`/publicaciones/${nextPost.id}/${formatTitle( nextPost.tituloPost )}`} className="link" >
                    <div className="flex flex-row-reverse">
                      <img src={nextPostImg} />
                      <div className="info-post-siguiente">
                        <span className="ico-siguiente mb-2"></span>
                        <span className="fecha-post-siguiente">
                          {formatDate(nextPost.fecha)}
                        </span>
                        <p className="d-block">{nextPost.tituloPost}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="col-6"></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
