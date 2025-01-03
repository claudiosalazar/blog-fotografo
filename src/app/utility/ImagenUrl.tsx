const ImagenUrl = (imgPath: string | undefined | null): string => {
  if (!imgPath) return "";

  const imgPathStr = String(imgPath); // Convertir imgPath a cadena de texto

  // Asegurarse de que imgPath no contenga una URL completa
  if (imgPathStr.startsWith("http")) {
    return imgPathStr;
  }

  // Devolver la URL proporcionada por el backend sin modificarla
  console.log(`Generated URL: ${imgPathStr}`);
  return imgPathStr;
};

export default ImagenUrl;