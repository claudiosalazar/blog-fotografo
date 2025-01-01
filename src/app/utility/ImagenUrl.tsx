const ImagenUrl = (imgPath: string): string => {
  if (!imgPath) return "";
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  return `${imageBaseUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
};

export default ImagenUrl;