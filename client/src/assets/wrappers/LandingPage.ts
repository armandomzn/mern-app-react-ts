import { styled } from "styled-components";

const Wrapper = styled.main`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 95%;

  nav {
    height: 6rem;
    display: flex;
    align-items: center;
    height: auto;
    padding: 1rem 0;
  }

  .logo {
    letter-spacing: 2px;
    color: var(--primary-500);
    text-transform: capitalize;
    font-size: clamp(1.5rem, 5vw, 3rem);
    margin-bottom: 0;
    font-family: var(--bodyFont);
    font-weight: 700;
  }

  .container-page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
  }

  .main-image {
    display: none;
  }

  .page-info {
    h2 {
      font-weight: bold;
      letter-spacing: 3px;
      font-size: clamp(2rem, 5vw, 4rem);
    }
    span {
      color: var(--primary-500);
    }
    p {
      max-width: 40rem;
      color: var(--text--color);
      line-height: 2;
      font-size: clamp(0.875rem, 5vw, 1rem);
    }
  }
  .btn-hero {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    letter-spacing: 1px;
  }

  .landing-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .container-page {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 3rem;
    }
    .main-image {
      display: block;
    }
  }
`;

export default Wrapper;
