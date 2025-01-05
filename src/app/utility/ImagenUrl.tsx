const ImagenUrl = (imgPath: string | undefined | null): string => {
  if (!imgPath) return "";

  const imgPathStr = String(imgPath);

  if (imgPathStr.startsWith("http")) {
    // console.log("URL completa:", imgPathStr);
    return imgPathStr;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  let finalUrl;
  if (isProduction) {
    finalUrl = `/${imgPathStr.startsWith('/') ? imgPathStr.slice(1) : imgPathStr}`;
  } else {
    finalUrl = `${backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl}/${imgPathStr.startsWith('/') ? imgPathStr.slice(1) : imgPathStr}`;
  }

  // console.log("URL generada:", finalUrl);
  return finalUrl;
};

export default ImagenUrl;
