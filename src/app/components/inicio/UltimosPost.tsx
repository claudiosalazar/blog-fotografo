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
          <div key={post.id}>
            <div className="post-inicio shadow-md rounded-lg overflow-hidden">
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link-blog">
                <Image src={ImagenUrl(post.imgPost)} alt={`${post.tituloPost}`} width={800} height={800} unoptimized />
                <span className="fecha-post">
                  {formatoFecha(post.fecha)}
                </span>
                <h3>
                  {post.tituloPost}
                </h3>
                <p className="text-gray-700 mt-2">{post.contenido}</p>
              </Link>
              <Link href={`/blog/${formatoUrlTitulo(post.tituloPost)}`} className="link more mb-10 md:mb-0">
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