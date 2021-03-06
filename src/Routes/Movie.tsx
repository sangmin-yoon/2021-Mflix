import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMovies,
  getPopularMovies,
  getTopMovies,
  getUpcoming,
  IGetMoviesResult,
  IMovie,
} from "../api";
import Modal from "../Components/Modal";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  font-weight: 500;
  margin-bottom: 20px;
  width: 50%;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

function Movie() {
  const [cTitle, setCTitle] = useState("");

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: topData } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopMovies
  );

  const { data: upcomingData } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcoming
  );

  const { data: popularData } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const allData = [];
  for (let i = 0; i < 20; ++i) {
    allData.push(data?.results[i]);
    allData.push(topData?.results[i]);
    allData.push(upcomingData?.results[i]);
    allData.push(popularData?.results[i]);
  }

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  const clickedMovie: any =
    bigMovieMatch?.params.movieId &&
    allData?.find((movie) => movie?.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      <Helmet>
        <title>{`Movie ${
          clickedMovie ? "| " + clickedMovie.title : ""
        }`}</title>
      </Helmet>
      {isLoading ? (
        <Loader>?????????...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider
            data={data}
            setCTitle={setCTitle}
            title="?????? ???????????? ??????"
          />
          <Slider
            data={popularData}
            setCTitle={setCTitle}
            title="?????? ?????? ?????????"
          />
          <Slider
            data={topData}
            setCTitle={setCTitle}
            title="????????? ?????? ?????????"
          />
          <Slider data={upcomingData} setCTitle={setCTitle} title="????????????" />
          <AnimatePresence>
            {bigMovieMatch?.params.movieId ? (
              <Modal
                selectId={bigMovieMatch?.params.movieId}
                clicked={clickedMovie}
                title={cTitle}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
