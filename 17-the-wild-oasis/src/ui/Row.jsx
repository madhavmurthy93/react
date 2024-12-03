import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 1rem;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
