import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  span svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
