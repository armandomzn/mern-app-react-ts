import { styled } from "styled-components";

export const Wrapper = styled.nav`
  height: 6rem;
  background: var(--background-secondary-color);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-btn {
    border: transparent;
    background: transparent;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
    font-size: clamp(1.5rem, 5vw, 2rem);
    color: var(--primary-400);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .nav-btn:hover {
    transform: rotate(90deg);
    color: var(--primary-300);
  }

  .logo,
  .logo-text {
    margin-bottom: 0;
    font-family: var(--bodyFont);
    letter-spacing: var(--letter-spacing);
    font-weight: 700;
    color: var(--primary-400);
    font-size: clamp(0.875rem, 5vw, 2rem);
  }

  .logo {
    display: block;
  }

  .logo-text {
    display: none;
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
