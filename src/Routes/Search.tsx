import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchMovie,
  getSearchTV,
  IGetMoviesResult,
  IGetTvResult,
} from "../api";
import Item from "../Components/Item";
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  position: relative;
  top: 150px;
  padding: 0px 50px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 50px;
`;

const Title = styled.span`
  display: block;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Message = styled.span`
  font-size: 20px;
  display: flex;
  padding: 20px;
  justify-content: center;
`;

function Search() {
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movieData, isLoading: movieLoading } =
    useQuery<IGetMoviesResult>(["search", `movie${keyword}`], () =>
      getSearchMovie(keyword)
    );
  const { data: tvData, isLoading: tvLoading } = useQuery<IGetTvResult>(
    ["search", `tv${keyword}`],
    () => getSearchTV(keyword)
  );

  console.log(movieData);

  const allData: any = [];
  movieData?.results.forEach((item) => allData.push(item));
  tvData?.results.forEach((item) => allData.push(item));

  console.log(allData);

  const match = useRouteMatch<{ searchId: string }>("/search/:searchId");

  const clickedItem: any =
    match?.params.searchId &&
    allData?.find((item: any) => item?.id === +match.params.searchId);

  return (
    <>
      <Wrapper>
        <Title>{keyword} 영화 검색결과</Title>
        {movieLoading ? (
          <Message>로딩중...</Message>
        ) : movieData?.results.length === 0 ? (
          <Message>결과가 존재하지 않습니다ㅠㅠ</Message>
        ) : (
          <Row>
            {movieData?.results.map((item, index) => (
              <Item key={index} item={item} title="search" />
            ))}
          </Row>
        )}

        <Title>{keyword} 시리즈 검색결과</Title>
        {tvLoading ? (
          <Message>로딩중...</Message>
        ) : tvData?.results.length === 0 ? (
          <Message>결과가 존재하지 않습니다ㅠㅠ</Message>
        ) : (
          <Row>
            {tvData?.results.map((item, index) => (
              <Item key={index} item={item} title="search" />
            ))}
          </Row>
        )}
      </Wrapper>
      <AnimatePresence>
        {match?.params.searchId ? (
          <Modal
            selectId={match?.params.searchId}
            clicked={clickedItem}
            title="search"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Search;
