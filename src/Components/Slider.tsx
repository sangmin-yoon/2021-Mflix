import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import Item from "./Item";

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  top: -80px;
  align-items: center;
  height: 260px;
  margin-top: 10px;
  margin-bottom: 20px;

  svg {
    position: absolute;
    right: 0;
    cursor: pointer;
    display: none;
  }

  &:hover {
    z-index: 1;
    svg {
      display: block;
    }
  }

  @media (max-width: 1500px) {
    height: 180px;
  }
`;

const Row = styled(motion.div)`
  padding: 0px 50px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Title = styled.h2`
  position: absolute;
  font-weight: 500;
  font-size: 18px;
  top: 0;
  left: 50px;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 5,
  },
};

interface IProps {
  data?: IGetMoviesResult;
  title: string;
  setCTitle: Function;
}

const offset = 6;

function Slider({ data, title, setCTitle }: IProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const clickTitle = (event: any) => {
    const T = event.currentTarget.title;
    setCTitle(T);
  };

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <>
      <SliderWrapper>
        <Title>{title}</Title>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            onClick={clickTitle}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
            title={title}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((item, index) => (
                <Item key={String(index) + title} item={item} title={title} />
              ))}
          </Row>
        </AnimatePresence>
        <FontAwesomeIcon
          onClick={increaseIndex}
          icon={faChevronRight}
          size="2x"
        />
      </SliderWrapper>
    </>
  );
}

export default Slider;
