const fetchData = async (endpoint: string) => {
  const BASE_URL = process.env.BASE_URL;
  console.log('BASE_URL:', BASE_URL);
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
  }

  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  const data = await response.json();
  return data;
};

export default fetchData;