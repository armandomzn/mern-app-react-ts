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
    font-size: clamp(1rem, 5vw, 1.875rem);
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
    }
    span {
      color: var(--primary-500);
    }
    p {
      max-width: 40rem;
      color: var(--grey-600);
      line-height: 2;
    }
  }
  .btn-hero {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    letter-spacing: 1px;
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
