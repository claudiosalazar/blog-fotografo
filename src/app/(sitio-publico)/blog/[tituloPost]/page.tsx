/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackLink from "@/app/utility/BackLink"; // Importa el nuevo componente
import Link from "next/link";

type PostData = {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
};

interface Props {
  params: Promise<{ tituloPost: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { tituloPost } = await params;
  const { post } = await getPostDataByTitulo(tituloPost);
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

const getPostDataByTitulo = async (tituloPost: string): Promise<{ post: PostData | null, prevPost: PostData | null, nextPost: PostData | null }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}post`);
  if (!response.ok) {
    return { post: null, prevPost: null, nextPost: null };
  }
  const posts: PostData[] = await response.json();
  const index = posts.findIndex((p) => formatUrlTitle(p.tituloPost) === tituloPost);
  const post = index !== -1 ? posts[index] : null;
  const prevPost = index > 0 ? posts[index - 1] : null;
  const nextPost = index < posts.length - 1 ? posts[index + 1] : null;
  return { post, prevPost, nextPost };
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

export default async function PostPage(props: Props) {
  const params = await props.params;
  const { tituloPost } = params;
  const { post, prevPost, nextPost } = await getPostDataByTitulo(tituloPost);
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
      <section className="post-detalle w-10/12 md:w-4/5">
        <div className="post-header">
          <BackLink className="post-header-volver">
            <div className="icono"></div>
          </BackLink> {/* Usa el nuevo componente */}
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

      <hr />

      <section className="post-nav w-10/12 md:w-4/5">
        <div className="flex justify-between">
          <div className="post-anterior">
            {prevPost && (
              <Link href={`/blog/${formatUrlTitle(prevPost.tituloPost)}`} className="link">
                <div className="flex flex-row">
                  <img src={getImageUrl(prevPost.imgPost)} alt={prevPost.alt} />
                  <div className="info-post-siguiente">
                    <span className="ico-anterior mb-2"></span>
                    <span className="fecha-post-anterior">
                      {new Date(prevPost.fecha).toLocaleDateString("es-ES")}
                    </span>
                    <p className="d-block">{prevPost.tituloPost}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="post-siguiente">
            {nextPost && (
              <Link href={`/blog/${formatUrlTitle(nextPost.tituloPost)}`} className="link">
                <div className="flex flex-row-reverse">
                  <img src={getImageUrl(nextPost.imgPost)} alt={nextPost.alt} />
                  <div className="info-post-siguiente">
                    <span className="ico-siguiente mb-2"></span>
                    <span className="fecha-post-siguiente">
                      {new Date(nextPost.fecha).toLocaleDateString("es-ES")}
                    </span>
                    <p className="d-block">{nextPost.tituloPost}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}