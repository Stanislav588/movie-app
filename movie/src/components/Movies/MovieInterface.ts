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
export interface Credits {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export default MoviePropertys;
