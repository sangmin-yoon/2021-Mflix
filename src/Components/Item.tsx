import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 200px;
  font-size: 66px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }

  @media (max-width: 1500px) {
    height: 120px;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -130px;
  height: 0px;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 18px;
  }

  span {
    font-size: 13px;
    opacity: 0.5;
  }
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -60,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    height: "130px",

    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface IProps {
  item: IMovie;
}

function Item({ item }: IProps) {
  console.log(item);

  const history = useHistory();
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <Box
      key={item.id}
      layoutId={item.id + ""}
      variants={BoxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(item.id)}
      bgPhoto={makeImagePath(item.backdrop_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{item.title}</h4>
        <span>개봉일 {item.release_date}</span>
        <h1>{item.vote_average}</h1>
      </Info>
    </Box>
  );
}

export default Item;
