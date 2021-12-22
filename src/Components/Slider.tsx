import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import Item from "./Item";

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
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
  toggleLeaving: () => void;
  index: number;
  data?: IGetMoviesResult;
  offset: number;
}

function Slider({ toggleLeaving, index, data, offset }: IProps) {
  return (
    <SliderWrapper>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((item) => (
              <Item item={item} />
            ))}
        </Row>
      </AnimatePresence>
    </SliderWrapper>
  );
}

export default Slider;
