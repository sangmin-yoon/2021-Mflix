import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getTV, IGetTvResult } from "../api";
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

function Tv() {
  const [cTitle, setCTitle] = useState("");

  const { data, isLoading } = useQuery<IGetTvResult>(["tv", "popular"], getTV);

  const allData = [];
  for (let i = 0; i < 20; ++i) {
    allData.push(data?.results[i]);
  }

  console.log(allData);

  const bigTvMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const clickedTv: any =
    bigTvMatch?.params.tvId &&
    allData?.find((tv) => tv?.id === +bigTvMatch.params.tvId);

  console.log("ddd" + clickedTv);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider
            data={data}
            setCTitle={setCTitle}
            title="현재 뜨고있는 TV시리즈"
          />

          <AnimatePresence>
            {bigTvMatch?.params.tvId ? (
              <Modal
                selectId={bigTvMatch?.params.tvId}
                clicked={clickedTv}
                title={cTitle}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
