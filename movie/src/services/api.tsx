import axios from "axios";

const apiKey = "962543d5afa5214404659415fe51fb0d";

export async function fetchingData(time_window = "week") {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${apiKey}`
  );
  return response.data.results;
}
export async function getCertainMovie(movieId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  );

  return response.data;
}
export async function getRecommendations(
  movieId: string | undefined,
  page: number = 1
) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&page=${page}`
  );

  return response.data.results;
}
export async function searchMovieByName(query: any) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );

  return response.data.results;
}
export async function fetchMoviesBy(sortBy: string) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1&sort_by=${sortBy}`
  );

  return response.data.results;
}
export async function fetchMoviesByGenre(genreId: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );

  return response.data.results;
}
export async function fetchMoviesByCountries(country: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/configuration/countries`
  );

  return response.data.results;
}

export async function fetchMovieVideos(video: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${video}/videos?api_key=${apiKey}`
  );
  return response.data.results;
}
export async function fetchCredits(movieId: any) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );
  return response.data.cast;
}
export async function getReviews(movieId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
  );
  return response.data.results;
}
export default fetchingData;
