import Link from "next/link";
import Image from "next/image";
import formatoFecha from "@/app/utility/FormatoFecha";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import fetchData from "@/app/utility/fetchData";
import ImagenUrl from "@/app/utility/ImagenUrl";

interface PostData {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
  alt: string;
}

const UltimosPost = async () => {
  let posts: PostData[] = [];

  try {
    posts = await fetchData("postInicio");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1">
        <h2>Últimas publicaciones</h2>
      </div>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-6 mx-5 md:mx-0">
        {posts.map((post) => (
          <div key={post.id} className="col-10 offset-1 col-md-6 offset-md-0 col-lg-4" >
            <div className="post-lista-item-inicio">
              <Image src={ImagenUrl(post.imgPost)} alt={`${post.tituloPost}`} width={800} height={800} className="imagen-lista" unoptimized />
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link-blog" >
                <span className="fecha-post">
                  {formatoFecha(post.fecha)}
                </span>
                <h3>{post.tituloPost}</h3>
                <p>{post.contenido}</p>
              </Link>
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link more" >
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

export default UltimosPost;