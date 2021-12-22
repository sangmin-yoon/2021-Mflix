import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const BigCover = styled.div`
  width: 100%;
  z-index: 3;
  background-size: cover;
  background-position: center center;
  height: 50%;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};

  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
  position: relative;
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
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

interface IProps {
  clickedMovie?: IMovie;
  movieId?: string;
}

function Modal({ clickedMovie, movieId }: IProps) {
  const history = useHistory();
  const { scrollY } = useViewportScroll();

  const onOverlayClick = () => history.push("/");

  return (
    <AnimatePresence>
      {movieId ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie layoutId={movieId} style={{ top: scrollY.get() + 100 }}>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                ></BigCover>
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
