const API_KEY = '1EOFGYl3IT4gKGiMeOUaoTGzk8OmRrE0KGqemoay'; // Replace with your API key

export const fetchAsteroidInfo = async (id: string) => {
  const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`);
  return await response.json();
};

export const fetchAsteroids = async () => {
  const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`);
  return await response.json();
};
