import Image from "next/image";
import Link from "next/link";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import formatoFecha from "@/app/utility/FormatoFecha";
import BackLink from "@/app/utility/BackLink";

interface Post {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
}

const PostPage = async ({ params }: { params: { tituloPost: string } }) => {
  const { tituloPost } = await params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}post`;
  const response = await fetch(url);
  const posts: Post[] = await response.json();
  const postIndex = posts.findIndex(post => formatoUrlTitulo(post.tituloPost) === tituloPost);
  const postItem = posts[postIndex];
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  if (!postItem) {
    return <p>Post no encontrado</p>;
  }

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
  };

  return (
    <>
      <section key={postItem.id} className="post-detalle w-10/12 md:w-4/5 d-block">
        <div className="post-header">
          <BackLink className="post-header-volver">
            <div className="icono"></div>
          </BackLink> {/* Usa el nuevo componente */}
          <div className="post-header-datos">
            <small>{formatoFecha(postItem.fecha)}</small>
            <h2>{postItem.tituloPost}</h2>
          </div>
          <div className="post-header-image">
            <Image src={getImageUrl(postItem.imgPost)} alt={postItem.alt || "Imagen de la publicación"} fill sizes={'100%, auto'} className="size-image" priority={true} />
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
        
            {prevPost && (
            <Link href={`/blog/${formatoUrlTitulo(prevPost.tituloPost)}`} className="link">
              <div className="post-anterior">
              <Image src={getImageUrl(prevPost.imgPost)} alt={prevPost.alt} width={800} height={800} className="size-image" priority={true} />
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
          
            {nextPost && (
              <Link href={`/blog/${formatoUrlTitulo(nextPost.tituloPost)}`} className="link">
                <div className="post-siguiente">
                <Image src={getImageUrl(nextPost.imgPost)} alt={nextPost.alt} width={800} height={800} className="size-image" priority={true} />
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
      </section>
    </>
  );
}

export default PostPage;