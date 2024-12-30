/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Title from "@/app/utility/title";

interface PostData {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}post`
        );
        if (!response.ok) throw new Error((await response.json()).message);

        const result = await response.json();
        setPosts(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching posts data:", error.message);
        } else {
          setError("An unknown error occurred");
          console.error("Error fetching posts data:", error);
        }
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleDateString("es-ES", options)
      .replace(/\//g, " / ");
  };

  const formatUrlTitle = (title: string): string => {
    const replacements: { [key: string]: string } = {
      'ñ': 'n',
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u'
    };

    const formattedTitle = title
      .toLowerCase()
      .replace(/[ñáéíóú]/g, (match) => replacements[match])
      .replace(/\s+/g, "-");

    return formattedTitle;
  };

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
  };

  if (error) return <div>Error: {error}</div>;

  if (!posts.length) return null;

  return (
    <>
      <section className="post-lista">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">Blog</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-8 md:mx-12 ">

          {posts.map((post) => (
            <div
              key={post.id}
              className="col-10 offset-1 col-md-6 offset-md-0 col-lg-4"
            >
              <div className="post-lista-item">
                <img src={getImageUrl(post.imgPost)} alt={post.alt || "Imagen de la publicación"} />
                <Link href={`/blog/${formatUrlTitle(post.tituloPost)}`} className="link-blog" >
                  <span className="fecha-post">
                    {formatDate(post.fecha)}
                  </span>
                  <h3>{post.tituloPost}</h3>
                  <p>{post.contenido}</p>
                </Link>
                <Link href={`/blog/${formatUrlTitle(post.tituloPost)}`} className="link more" >
                  <span className="d-block">Leer más</span>
                  <span className="d-block ico-more"></span>
                </Link>
              </div>
            </div>
          ))}

          <div className="col-12 d-flex justify-content-center">
            <Link href="/post" className="btn">
              Cargar más
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Title(Blog);