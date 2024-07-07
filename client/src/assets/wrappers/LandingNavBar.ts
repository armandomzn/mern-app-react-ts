import styled from "styled-components";

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: auto;
  padding: 1rem 0;

  .logo {
    letter-spacing: 2px;
    color: var(--primary-500);
    text-transform: capitalize;
    font-size: clamp(1.5rem, 5vw, 3rem);
    margin-bottom: 0;
    font-family: var(--bodyFont);
    font-weight: 700;
  }
`;
