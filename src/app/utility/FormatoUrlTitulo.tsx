const formatoUrlTitulo = (title: string): string => {
  const replacements: { [key: string]: string } = {
    'ñ': 'n',
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u'
  };

  const formattedTitle = title
    .toLowerCase()
    .replace(/[ñáéíóú]/g, (match) => replacements[match])
    .replace(/\s+/g, "-");

  return formattedTitle;
};

export default formatoUrlTitulo;