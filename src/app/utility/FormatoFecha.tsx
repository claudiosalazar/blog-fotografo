const formatoFecha = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(dateString)
    .toLocaleDateString("es-ES", options)
    .replace(/\//g, " / ");
};

export default formatoFecha;