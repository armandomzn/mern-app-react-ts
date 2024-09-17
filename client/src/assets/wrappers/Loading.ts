import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .loading {
    width: clamp(1rem, 5vw, 6rem);
    height: clamp(1rem, 5vw, 6rem);
    border: 5px solid var(--grey-400);
    border-radius: 50%;
    border-top-color: var(--primary-500);
    animation: spinner 0.9s linear infinite;
  }
`;
