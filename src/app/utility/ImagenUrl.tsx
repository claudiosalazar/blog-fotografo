// local
// const ImagenUrl = (imgPath: string | undefined | null): string => {
//   if (!imgPath) return "";

//   const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
//   const imgPathStr = String(imgPath);

//   if (imgPathStr.startsWith("http")) {
//     return imgPathStr;
//   }

//   const finalUrl = `${BASE_URL.replace(/\/$/, "")}/${imgPathStr.replace(/^\//, "")}`;
//   return finalUrl;
// };

// export default ImagenUrl;

// Production
const ImagenUrl = (imgPath: string | undefined | null): string => {
  if (!imgPath) return "";

  const imgPathStr = String(imgPath);

 if (imgPathStr.startsWith("http")) {
    return imgPathStr;
  }
  return imgPathStr;
 };

export default ImagenUrl;