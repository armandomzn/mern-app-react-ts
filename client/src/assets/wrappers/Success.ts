import styled from "styled-components";

export const Wrapper = styled.main`
  background: var(--primary-100);
  min-height: 100vh;
  padding: 1rem 0;

  .landing-navbar,
  .section-center {
    max-width: var(--max-width);
    margin: 0 auto;
    width: 95%;
  }

  .section-center {
    display: grid;
    place-items: center;
    grid-template-columns: minmax(0, 1fr);
  }

  .success-image svg {
    max-width: 20rem;
    max-height: 20rem;
    width: 100%;
  }

  .success-info {
    text-align: center;
    width: 100%;

    h1 {
      color: var(--primary-500);
      font-weight: bold;
      font-size: clamp(1rem, 5vw, 3.052rem);
    }
    p {
      margin-bottom: 0.5rem;
      color: var(--primary-800);
      font-size: clamp(0.575rem, 5vw, 1rem);

      &:last-of-type {
        margin-bottom: 1rem;
      }
    }
  }
`;
