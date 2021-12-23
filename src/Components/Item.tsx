import { motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IMovie, ITv } from "../api";
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
    y: -70,
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
  item: any;
  title: string;
}

function Item({ item, title }: IProps) {
  const match = useRouteMatch();

  const history = useHistory();
  const onBoxClicked = (id: number) => {
    history.push(`${match.url}/${id}`);
  };

  return (
    <Box
      layoutId={String(item.id) + title}
      variants={BoxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(item.id)}
      bgPhoto={makeImagePath(item.backdrop_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{item?.title || item?.name}</h4>
        <span>
          {item.release_date
            ? "개봉일: " + item.release_date
            : "첫 방영일: " + item.first_air_date}
        </span>
        <h1>{item.vote_average}</h1>
      </Info>
    </Box>
  );
}

export default Item;
