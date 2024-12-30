/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

type PostData = {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
};

export const generateMetadata = async ({ params }: { params: { tituloPost: string } }): Promise<Metadata> => {
  const post = await getPostDataByTitulo(params.tituloPost);
  if (!post) {
    return {
      title: "Post no encontrado",
      description: "El post solicitado no existe.",
    };
  }
  return {
    title: post.tituloPost,
    description: post.contenido.slice(0, 160),
  };
};

const getPostDataByTitulo = async (tituloPost: string): Promise<PostData | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}post`);
  if (!response.ok) {
    return null;
  }
  const posts: PostData[] = await response.json();
  const post = posts.find((p) => formatUrlTitle(p.tituloPost) === tituloPost);
  return post || null;
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

export const generateStaticParams = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}post`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: PostData[] = await response.json();
  return posts.map((post) => ({
    tituloPost: formatUrlTitle(post.tituloPost),
  }));
};

const PostPage = async ({ params }: { params: { tituloPost: string } }) => {
  const post = await getPostDataByTitulo(params.tituloPost);
  if (!post) {
    notFound();
  }

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
  };

  return (
    <>
      <section className="post-detalle w-4/5">
        <div className="post-header">
          <Link href="/blog" className="post-header-volver">
            <div className="icono"></div>
          </Link>
          <div className="post-header-datos">
            <small>{new Date(post.fecha).toLocaleDateString("es-ES")}</small>
            <h2>{post.tituloPost}</h2>
          </div>
          <div className="post-header-image">
            <img src={getImageUrl(post.imgPost)} alt={post.alt || "Imagen de la publicación"} />
          </div>
        </div>
        <div className="post-body">
          {post.contenido.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
};

export default PostPage;