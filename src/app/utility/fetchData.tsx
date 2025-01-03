// filepath: /Users/claudiosv/Sites/Next/blog-fotografo/v3/src/app/utility/fetchData.tsx
const fetchData = async (endpoint: string) => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
  }

  const url = `${BACKEND_URL}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  const data = await response.json();
  return data;
};

export default fetchData;