import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

  h4 {
    letter-spacing: 2px;
    color: var(--primary-400);
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 1.875rem);
    text-align: center;
  }
`;
