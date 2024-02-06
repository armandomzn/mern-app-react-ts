import { styled } from "styled-components";

export const Wrapper = styled.aside<{ $isDarkTheme?: boolean }>`
  .sidebar-container {
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }

  .show-sidebar {
    visibility: visible;
    z-index: 10;
    opacity: 1;
  }

  .content {
    background: var(--background-color);
    width: 90%;
    height: 95vh;
    border-radius: var(--border-radius);
    display: grid;
    place-items: center;
    position: relative;
    row-gap: 3rem;
  }

  header {
    align-self: self-end;
  }

  .logo {
    color: var(--primary-400);
    letter-spacing: 3px;
    font-weight: 700;
    margin-bottom: 0;
    font-size: clamp(1.2rem, 5vw, 1.5rem);
  }

  .close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: transparent;
    background: transparent;
    color: var(--primary-400);
    font-size: 2rem;
    cursor: pointer;
  }

  .close-btn svg {
    transition: transform 0.3s ease-in;
  }

  .close-btn:hover svg {
    transform: rotate(360deg) scale(0.8);
    color: ${(props) =>
      props.$isDarkTheme ? "var(--primary-200)" : "var(--primary-800)"};
  }

  .nav-links {
    align-self: self-start;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  .nav-link {
    text-transform: capitalize;
    color: var(--text-color);
    display: grid;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;
    grid-template-columns: 25% 75%;
    font-size: clamp(1rem, 5vw, 1.2rem);
    transition: color 0.3s ease-in-out;
  }

  .nav-link:hover {
    color: ${(props) =>
      props.$isDarkTheme ? "var(--primary-200)" : "var(--primary-600)"};
  }

  .active {
    color: ${(props) =>
      props.$isDarkTheme ? "var(--primary-300)" : "var(--primary-600)"};
  }

  @media (min-width: 992px) {
    display: none;
  }
`;
