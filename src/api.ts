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

interface IGenres {
  id: number;
  name: string;
}

export interface IDetail {
  genres: IGenres[];
  videos: {
    results: [
      {
        key: string;
      }
    ];
  };
  runtime: number;
}

export interface ITv {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
}

export interface IGetTvResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

/// Movies

export function getMovies() {
  return fetch(
    `${BASE_PATH}movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getUpcoming() {
  return fetch(
    `${BASE_PATH}movie/upcoming?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getTopMovies() {
  return fetch(
    `${BASE_PATH}movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}movie/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getDetailMovies(id: number) {
  return fetch(
    `${BASE_PATH}movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos`
  ).then((response) => response.json());
}

///TV

export function getTV() {
  return fetch(`${BASE_PATH}tv/popular?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getTopTV() {
  return fetch(
    `${BASE_PATH}tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getDetailTV(id: number) {
  return fetch(
    `${BASE_PATH}tv/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos`
  ).then((response) => response.json());
}

/// search
export function getSearchMovie(name: any) {
  return fetch(
    `${BASE_PATH}search/movie?api_key=${API_KEY}&language=ko-KR&query=${name}`
  ).then((response) => response.json());
}

export function getSearchTV(name: any) {
  return fetch(
    `${BASE_PATH}search/tv?api_key=${API_KEY}&language=ko-KR&query=${name}`
  ).then((response) => response.json());
}
