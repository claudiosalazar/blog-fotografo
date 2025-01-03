const ImagenUrl = (imgPath: string | undefined | null): string => {
  if (!imgPath) return "";

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const imgPathStr = String(imgPath); // Convertir imgPath a cadena de texto

  // Asegurarse de que imgPath no contenga una URL completa
  if (imgPathStr.startsWith("http")) {
    // console.log(`Generated URL: ${imgPathStr}`);
    return imgPathStr;
  }

  // Generar una URL completa basada en BASE_URL
  const finalUrl = `${BASE_URL.replace(/\/$/, "")}/${imgPathStr.replace(/^\//, "")}`;
  // console.log(`Generated URL: ${finalUrl}`);
  return finalUrl;
};

export default ImagenUrl;