const ImagenUrl = (imgPath: string): string => {
  if (!imgPath) return "";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  return `${backendUrl.replace(/\/$/, "")}/${imgPath.replace(/^\//, "")}`;
};

export default ImagenUrl;