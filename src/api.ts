const API_KEY = "5b482b54ede8f968398b20d6a3eea898";
const BASE_PATH = "https://api.themoviedb.org/3/";

export interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IDetailMovie {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getTopMovies() {
  return fetch(
    `${BASE_PATH}movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getDetailMovies(id: number) {
  return fetch(
    `${BASE_PATH}movie/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
