import { styled } from "styled-components";

export const Wrapper = styled.main`
  background: var(--primary-100);
  .section-center {
    height: 100vh;
    max-width: var(--max-width);
    margin: 0 auto;
    width: 95%;
    display: grid;
    justify-items: center;
    align-items: center;
    align-content: center;
    text-align: center;
    h1 {
      font-weight: bold;
      font-size: clamp(2rem, 50vw, 11rem);
      color: var(--primary-600);
      letter-spacing: var(--letter-spacing);
    }
    h4 {
      letter-spacing: 1px;
      color: var(--primary-700);
      font-size: clamp(1.5rem, 5vw, 2rem);
    }
    p {
      color: var(--primary-500);
      letter-spacing: 1px;
    }
    a {
      text-transform: capitalize;
      color: var(--primary-700);
      letter-spacing: var(--letter-spacing);
      font-weight: 700;
      transition: var(--transition);
      border: 1px solid transparent;
    }
  }
  a:hover {
    border-bottom: 1px solid var(--primary-500);
  }
`;
