import axios from "axios";

const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;

export async function fetchingData(time_window = "week") {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${apiKey}`
  );
  return response.data.results;
}
export async function getContentDetails(movieId: string | undefined) {
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
export async function searchMovieByName(query: string) {
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
  return response.data;
}
export async function getSeriesCredits(seriesId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}/season/1/credits?api_key=${apiKey}`
  );
  return response.data;
}
export async function getReviews(movieId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
  );
  return response.data.results;
}

export async function getPopularSeries() {
  const response = await axios.get(`
https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
  return response.data.results;
}

export async function fetchNowPlayingMovies() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
  );
  return response.data.results;
}
export async function getSeriesDetails(seriesId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}`
  );
  return response.data;
}

export async function getSeriesTrailer(seriesId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${apiKey}`
  );
  return response.data.results;
}

export async function getSeriesReviews(seriesId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}/reviews?api_key=${apiKey}`
  );
  return response.data.results;
}

export async function getSeriesRecomendations(seriesId: string | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?api_key=${apiKey}`
  );
  return response.data.results;
}
export async function getTopRatedSeries() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
  );
  return response.data.results;
}

export async function getSeriesGenres(genreId: number | undefined) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&language=en-US

`
  );
  return response.data.results;
}
export default fetchingData;
