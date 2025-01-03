import Image from "next/image";
import Link from "next/link";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import formatoFecha from "@/app/utility/FormatoFecha";
import BackLink from "@/app/utility/BackLink";
// import getImagenUrl from "@/app/utility/UseImagenUrl";
import ImagenUrlProduction from "@/app/utility/ImagenUrlProduction";
// import fetchData from "@/app/utility/fetchData";

interface Post {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
}

// export async function generateStaticParams() {
//   let data: Post[] = [];

//   try {
//     data = await fetchData("post");
//   } catch {
//     return <div>Error al obtener los datos</div>;
//   }

//   const posts = data;

//   return posts.map((post) => ({
//     tituloPost: formatoUrlTitulo(post.tituloPost),
//   }));
// }

export const generateStaticParams = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}post`;
  const response = await fetch(url);
  const posts: Post[] = await response.json();

  return posts.map((post) => ({
    tituloPost: formatoUrlTitulo(post.tituloPost),
  }));
};


export type ParamsType = Promise<{ tituloPost: string }>;

const PostPage = async ({ params }: { params: ParamsType }) => {
  const { tituloPost } = await params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}post`;
  let posts: Post[] = [];

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    posts = await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  const postItem = posts.find(post => formatoUrlTitulo(post.tituloPost) === tituloPost);
  const postIndex = posts.findIndex(post => formatoUrlTitulo(post.tituloPost) === tituloPost);
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  if (!postItem) {
    return (
      <div className="post-no-encontrado">
        <p>Post no encontrado</p>
        <Link href="/blog" className="btn primario">
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <section key={postItem.id} className="post-detalle w-10/12 md:w-4/5 d-block">
        <div className="post-header">
          <BackLink className="post-header-volver">
            <div className="icono"></div>
          </BackLink>
          <div className="post-header-datos">
            <small>{formatoFecha(postItem.fecha)}</small>
            <h2>{postItem.tituloPost}</h2>
          </div>
          <div className="post-header-image">
            <Image src={ImagenUrlProduction(postItem.imgPost)} alt={postItem.alt || "Imagen de la publicación"} width={800} height={800} className="imagen-detalle-post" unoptimized />
          </div>
        </div>
        <div className="post-body">
          {postItem.contenido.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <hr className="hidden md:block mb-20" />

      <section className="post-nav w-10/12 md:w-4/5">
        <div className="contenedor-post-anterior">
          {prevPost && (
            <Link href={`/blog/${formatoUrlTitulo(prevPost.tituloPost)}`}>
              <div className="post-anterior">
                <Image src={ImagenUrlProduction(prevPost.imgPost)} alt={prevPost.alt} width={800} height={800} unoptimized />
                <div className="info">
                  <span className="ico-anterior mb-2"></span>
                  <span className="fecha-post-anterior">
                    {formatoFecha(prevPost.fecha)}
                  </span>
                  <p className="d-block">{prevPost.tituloPost}</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="contenedor-post-siguiente">
          {nextPost && (
            <Link href={`/blog/${formatoUrlTitulo(nextPost.tituloPost)}`}>
              <div className="post-siguiente">
                <Image src={ImagenUrlProduction(nextPost.imgPost)} alt={nextPost.alt} width={800} height={800} unoptimized />
                <div className="info">
                  <span className="ico-siguiente mb-2"></span>
                  <span className="fecha-post-siguiente">
                    {formatoFecha(nextPost.fecha)}
                  </span>
                  <p className="d-block text-end">{nextPost.tituloPost}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default PostPage;