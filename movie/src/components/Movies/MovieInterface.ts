interface MoviePropertys {
  name: string;
  title: string;
  media_type: string;
  backdrop_path: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  id: string;
  vote_average: string;
  vote_count: number;
}

export interface Reviews {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export default MoviePropertys;
