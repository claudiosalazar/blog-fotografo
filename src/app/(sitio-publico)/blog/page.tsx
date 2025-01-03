import Link from "next/link";
import Image from "next/image";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import formatoFecha from "@/app/utility/FormatoFecha";
// import getImagenUrl from "@/app/utility/UseImagenUrl";
import ImagenUrlProduction from "@/app/utility/ImagenUrlProduction";
import fetchData from "@/app/utility/fetchData";

interface Post {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
}

const Blog = async () => {
  let data: Post[] = [];

  try {
    data = await fetchData("post");
  } catch {
    return <div>Error al obtener los datos</div>;
  }

  const posts = data;

  return (
    <>
      <section className="post-lista">
        <div className="grid grid-cols-1 gap-1">
          <h1 className="text-center">Blog</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-8 md:mx-12 ">
          {posts.map((post) => (
            <div key={post.id} className="col-10 offset-1 col-md-6 offset-md-0 col-lg-4" >
              <div className="post-lista-item">
                <Image src={ImagenUrlProduction(post.imgPost)} alt={`${post.tituloPost}`} width={800} height={800} className="imagen-lista" unoptimized />
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

        <div className="flex justify-center">
          <Link href="/post" className="btn primario">
            Cargar más
          </Link>
        </div>
      </section>
    </>
  );
}

export default Blog;