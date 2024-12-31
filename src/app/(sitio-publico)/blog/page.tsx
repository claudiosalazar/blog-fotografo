import Link from "next/link";
import Image from "next/image";
import formatoUrlTitulo from "@/app/utility/FormatoUrlTitulo";
import formatoFecha from "@/app/utility/FormatoFecha";

interface Post {
  id: string;
  fecha: string;
  tituloPost: string;
  contenido: string;
  imgPost: string;
}

const Blog = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}post`;
  const response = await fetch(url);
  const posts: Post[] = await response.json();

  const getImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
  };

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
              <Image src={getImageUrl(post.imgPost)} alt={`${post.tituloPost}`}  width={800} height={800} layout="responsive" unoptimized/>
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