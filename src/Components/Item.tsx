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
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

interface IProps {
  item: IMovie;
}

function Item({ item }: IProps) {
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
      onClick={() => onBoxClicked(item.id)}
      transition={{ type: "tween" }}
      bgPhoto={makeImagePath(item.backdrop_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{item.title}</h4>
      </Info>
    </Box>
  );
}

export default Item;
