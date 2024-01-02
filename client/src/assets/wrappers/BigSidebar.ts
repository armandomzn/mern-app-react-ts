import { styled } from "styled-components";

export const Wrapper = styled.aside<{ isDarkTheme?: boolean }>`
  display: none;
  @media (min-width: 992px) {
    display: block;
    transition: all 0.3s ease-in-out;
    .sidebar-container {
      height: 100vh;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.1);
      padding: 0 2rem;
      background: var(--background-secondary-color);
      margin-left: -25rem;
      /* visibility: hidden; */
      transition: all 0.3s ease-in-out;
      min-height: 100vh;
      height: 100%;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      margin-bottom: 2rem;
    }
    .logo {
      letter-spacing: 4px;
      font-weight: 700;
      color: var(--primary-400);
      margin-bottom: 0;
    }
    .nav-links {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 3rem;
    }
    .nav-link {
      font-size: 1rem;
      text-transform: capitalize;
      color: var(--text-color);
      display: grid;
      grid-template-columns: 25% 75%;
      align-items: center;
      column-gap: 1rem;
      letter-spacing: var(--letter-spacing);
      font-size: clamp(1rem, 5vw, 1.2rem);
      transition: padding-left 0.3s ease-in-out, color 0.3s ease-in-out;
    }
    .nav-link svg {
      justify-self: end;
    }
    .nav-link:hover {
      padding-left: 2rem;
      color: ${(props) =>
        props.isDarkTheme ? "var(--primary-200)" : "var(--primary-600)"};
    }
    .active {
      color: ${(props) =>
        props.isDarkTheme ? "var(--primary-300)" : "var(--primary-600)"};
    }

    .content {
      position: sticky;
      top: 0;
    }
  }
`;
