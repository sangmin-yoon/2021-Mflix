import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getTopMovies, IGetMoviesResult, IMovie } from "../api";
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
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

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: topData } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopMovies
  );

  const allData = [];
  for (let i = 0; i < 20; ++i) {
    allData.push(data?.results[i]);
    allData.push(topData?.results[i]);
  }

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const clickedMovie: any =
    bigMovieMatch?.params.movieId &&
    allData?.find((movie) => movie!.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={data} title="지금 뜨는 콘텐츠" />
          <Slider data={topData} title="평점이 높은 콘텐츠" />
          <Modal
            movieId={bigMovieMatch?.params.movieId}
            clickedMovie={clickedMovie}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
