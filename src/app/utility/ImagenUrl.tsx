const ImagenUrl = (imgPath: string): string => {
  if (!imgPath) return "";
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  // Asegurarse de que imgPath no contenga una URL completa
  if (imgPath.startsWith("http")) {
    return imgPath;
  }
  return `${imageBaseUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
};

export default ImagenUrl;