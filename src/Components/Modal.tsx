import { motion, useViewportScroll } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getDetailMovies, getDetailTV, IDetail, IMovie } from "../api";
import { makeImagePath } from "../utils";

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 50%;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  width: 50%;
  margin-right: 40px;
  font-size: 46px;
`;

const BigOverview = styled.p`
  padding: 20px;
  font-size: 20px;
  top: -80px;

  color: ${(props) => props.theme.white.lighter};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  z-index: 3;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.darker};
`;

const VideoCover = styled.iframe`
  width: 100%;
  height: 50%;
`;

const SubWraap = styled.div`
  h5 {
    display: inline;
    opacity: 0.6;
    font-weight: bold;
  }

  span {
    margin-left: 5px;
    color: ${(props) => props.theme.white.lighter};
  }
`;

const OverViewTop = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 10px;
`;

interface IProps {
  clicked?: any;
  selectId?: string;
  title: string;
}

function Modal({ clicked, selectId, title }: IProps) {
  const { data: movieD } = useQuery<IDetail>(["movie", "detail"], () =>
    getDetailMovies(+selectId!)
  );

  const { data: tvD } = useQuery<IDetail>(["tv", "detail"], () =>
    getDetailTV(+selectId!)
  );

  let data: any;
  if (clicked.title) {
    data = movieD;
  }
  if (clicked.name) {
    data = tvD;
  }

  const history = useHistory();
  const { scrollY } = useViewportScroll();

  const onOverlayClick = () => history.goBack();

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        layoutId={selectId + title}
        style={{ top: scrollY.get() + 100 }}
      >
        {clicked && (
          <>
            {data?.videos?.results[0]?.key ? (
              <VideoCover
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}?autoplay=1&mute=1 `}
              />
            ) : (
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    clicked.backdrop_path
                  )})`,
                }}
              ></BigCover>
            )}
            <OverViewTop>
              <BigTitle>{clicked.title || clicked.name}</BigTitle>
              <SubWraap>
                <h5>장르: </h5>
                <span>
                  {data?.genres?.map((item: any, index: number) =>
                    index === data.genres.length - 1
                      ? item.name
                      : item.name + ", "
                  )}
                </span>
              </SubWraap>
            </OverViewTop>
            <BigOverview>{clicked.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  );
}

export default Modal;
